import tls from "tls";
import { performance } from "perf_hooks";
import nodemailer from "nodemailer";
import {
  EC2Client,
  DescribeInstancesCommand,
  DescribeInstanceStatusCommand,
  StartInstancesCommand,
} from "@aws-sdk/client-ec2";
import {
  CloudWatchClient,
  GetMetricStatisticsCommand,
} from "@aws-sdk/client-cloudwatch";
import {
  SSMClient,
  DescribeInstanceInformationCommand,
  SendCommandCommand,
  GetCommandInvocationCommand,
} from "@aws-sdk/client-ssm";

const env = process.env;

const config = {
  region: requiredEnv("AWS_REGION"),
  instanceId: requiredEnv("EC2_INSTANCE_ID"),
  productionUrl: requiredEnv("PRODUCTION_URL"),
  restartCommand: env.RESTART_COMMAND || "docker restart portfolio-next",
  smtp: {
    host: requiredEnv("SMTP_HOST"),
    port: Number(env.SMTP_PORT || 587),
    secure: env.SMTP_SECURE === "true",
    user: requiredEnv("SMTP_USER"),
    pass: requiredEnv("SMTP_PASS"),
    from: requiredEnv("SMTP_FROM"),
    to: requiredEnv("SMTP_TO"),
  },
};

const ec2 = new EC2Client({ region: config.region });
const cloudwatch = new CloudWatchClient({ region: config.region });
const ssm = new SSMClient({ region: config.region });

async function main() {
  const report = {
    startedAt: new Date(),
    checks: [],
    actions: [],
    ssm: null,
    runtime: null,
    postRemediationHealth: null,
    crashed: false,
  };

  try {
    const health = await checkHttpWithRetries(config.productionUrl);
    report.checks.push({
      name: "HTTP health",
      ok: health.ok,
      detail: `${health.status || "no status"} in ${health.responseTimeMs || "n/a"}ms after ${health.attempts} attempt(s)`,
      data: health,
    });

    const cert = await checkSslCertificateSafe(config.productionUrl);
    report.checks.push({
      name: "SSL certificate",
      ok: cert.ok,
      detail: `${cert.daysRemaining} day(s) remaining`,
      data: cert,
    });

    const instance = await checkInstanceState(config.instanceId);
    report.checks.push({
      name: "EC2 instance state",
      ok: instance.state === "running",
      detail: instance.state,
      data: instance,
    });

    const statuses = await checkInstanceStatuses(config.instanceId);
    report.checks.push({
      name: "EC2 status checks",
      ok: statuses.ok,
      detail: `system=${statuses.systemStatus}, instance=${statuses.instanceStatus}`,
      data: statuses,
    });

    const metrics = await checkCloudWatchMetrics(config.instanceId);
    report.checks.push({
      name: "CloudWatch metrics",
      ok: metrics.ok,
      detail: `avg CPU=${formatNumber(metrics.averageCpu)}%, status check failures=${metrics.statusCheckFailures}`,
      data: metrics,
    });

    report.runtime = await collectRuntimeStats(instance.state);

    await remediateIfAllowed({ report, health, instance, statuses });
  } catch (error) {
    report.crashed = true;
    report.actions.push(`Monitor crashed: ${errorMessage(error)}`);
    throw error;
  } finally {
    await sendReport(report);
  }

  if (report.crashed) {
    process.exitCode = 1;
  }
}

async function remediateIfAllowed({ report, health, instance, statuses }) {
  if (!health.ok && instance.state === "running" && statuses.ok) {
    report.actions.push(`HTTP failed while EC2 was healthy; running SSM restart command: ${config.restartCommand}`);
    const reachable = await checkSsmReachability(config.instanceId);
    if (!reachable.ok) {
      report.actions.push(`SSM remediation skipped; instance is not SSM Online (${reachable.pingStatus || "unknown"}).`);
      return;
    }

    report.ssm = await runSsmCommand(config.restartCommand, "portfolio-next monitoring remediation", 2048);
    report.actions.push(`SSM restart finished with status: ${report.ssm.status}`);

    await sleep(30000);
    report.postRemediationHealth = await checkHttpWithRetries(config.productionUrl);
    report.actions.push(
      `Post-remediation HTTP health: ${report.postRemediationHealth.ok ? "passed" : "failed"}`
    );
    return;
  }

  if (instance.state === "stopped") {
    report.actions.push(`Instance is stopped; starting ${config.instanceId}.`);
    await ec2.send(new StartInstancesCommand({ InstanceIds: [config.instanceId] }));
    await sleep(30000);
    report.postRemediationHealth = await checkHttpWithRetries(config.productionUrl);
    return;
  }

  if (instance.state === "running" && !statuses.ok) {
    report.actions.push("Instance is running but an EC2 status check is failing; no auto-reboot was attempted.");
    return;
  }

  report.actions.push("No remediation needed.");
}

async function checkHttpWithRetries(url) {
  const backoffs = [2000, 4000, 8000];
  let last = null;

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    last = await checkHttp(url, attempt);
    if (last.ok) {
      return last;
    }

    if (attempt <= backoffs.length) {
      await sleep(backoffs[attempt - 1]);
    }
  }

  return last;
}

async function checkHttp(url, attempt) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  const started = performance.now();

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "manual",
      signal: controller.signal,
    });
    const responseTimeMs = Math.round(performance.now() - started);

    return {
      ok: response.status === 200 && responseTimeMs < 3000,
      status: response.status,
      responseTimeMs,
      attempts: attempt,
    };
  } catch (error) {
    return {
      ok: false,
      error: errorMessage(error),
      responseTimeMs: Math.round(performance.now() - started),
      attempts: attempt,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function checkSslCertificate(urlValue) {
  const url = new URL(urlValue);
  const port = Number(url.port || 443);
  const certificate = await new Promise((resolve, reject) => {
    const socket = tls.connect(
      {
        host: url.hostname,
        port,
        servername: url.hostname,
        rejectUnauthorized: false,
      },
      () => {
        const cert = socket.getPeerCertificate();
        socket.end();
        resolve(cert);
      }
    );

    socket.setTimeout(10000, () => {
      socket.destroy();
      reject(new Error("Timed out fetching TLS certificate"));
    });
    socket.on("error", reject);
  });

  const validTo = new Date(certificate.valid_to);
  const daysRemaining = Math.floor((validTo.getTime() - Date.now()) / 86400000);

  return {
    ok: daysRemaining >= 14,
    validTo: validTo.toISOString(),
    daysRemaining,
  };
}

async function checkSslCertificateSafe(urlValue) {
  try {
    return await checkSslCertificate(urlValue);
  } catch (error) {
    return {
      ok: false,
      validTo: null,
      daysRemaining: "unknown",
      error: errorMessage(error),
    };
  }
}

async function checkInstanceState(instanceId) {
  const response = await ec2.send(
    new DescribeInstancesCommand({ InstanceIds: [instanceId] })
  );
  const instance = response.Reservations?.[0]?.Instances?.[0];
  if (!instance) {
    throw new Error(`Instance ${instanceId} was not found`);
  }

  return {
    state: instance.State?.Name || "unknown",
    publicIp: instance.PublicIpAddress,
  };
}

async function checkInstanceStatuses(instanceId) {
  const response = await ec2.send(
    new DescribeInstanceStatusCommand({
      InstanceIds: [instanceId],
      IncludeAllInstances: true,
    })
  );
  const status = response.InstanceStatuses?.[0];

  return {
    ok:
      status?.SystemStatus?.Status === "ok" &&
      status?.InstanceStatus?.Status === "ok",
    systemStatus: status?.SystemStatus?.Status || "unknown",
    instanceStatus: status?.InstanceStatus?.Status || "unknown",
  };
}

async function checkCloudWatchMetrics(instanceId) {
  const end = new Date();
  const start = new Date(end.getTime() - 60 * 60 * 1000);

  const [cpu, statusFailures] = await Promise.all([
    cloudwatch.send(
      new GetMetricStatisticsCommand({
        Namespace: "AWS/EC2",
        MetricName: "CPUUtilization",
        Dimensions: [{ Name: "InstanceId", Value: instanceId }],
        StartTime: start,
        EndTime: end,
        Period: 300,
        Statistics: ["Average"],
      })
    ),
    cloudwatch.send(
      new GetMetricStatisticsCommand({
        Namespace: "AWS/EC2",
        MetricName: "StatusCheckFailed",
        Dimensions: [{ Name: "InstanceId", Value: instanceId }],
        StartTime: start,
        EndTime: end,
        Period: 300,
        Statistics: ["Maximum"],
      })
    ),
  ]);

  const cpuPoints = cpu.Datapoints || [];
  const averageCpu =
    cpuPoints.length === 0
      ? 0
      : cpuPoints.reduce((sum, point) => sum + (point.Average || 0), 0) /
        cpuPoints.length;
  const statusCheckFailures = Math.max(
    0,
    ...(statusFailures.Datapoints || []).map((point) => point.Maximum || 0)
  );

  return {
    ok: averageCpu <= 85 && statusCheckFailures === 0,
    averageCpu,
    statusCheckFailures,
    datapoints: cpuPoints.length,
  };
}

async function checkSsmReachability(instanceId) {
  const response = await ssm.send(
    new DescribeInstanceInformationCommand({
      Filters: [{ Key: "InstanceIds", Values: [instanceId] }],
    })
  );
  const info = response.InstanceInformationList?.[0];

  return {
    ok: info?.PingStatus === "Online",
    pingStatus: info?.PingStatus,
  };
}

async function collectRuntimeStats(instanceState) {
  if (instanceState !== "running") {
    return {
      ok: false,
      status: "Skipped",
      stdout: "",
      stderr: `Instance state is ${instanceState}; runtime stats require a running instance.`,
    };
  }

  const reachable = await checkSsmReachability(config.instanceId);
  if (!reachable.ok) {
    return {
      ok: false,
      status: "Skipped",
      stdout: "",
      stderr: `Instance is not SSM Online (${reachable.pingStatus || "unknown"}).`,
    };
  }

  const command = [
    "set -e",
    "echo '== Host memory ==' ",
    "free -h || true",
    "echo ''",
    "echo '== Host disk ==' ",
    "df -h / || true",
    "echo ''",
    "echo '== Docker containers ==' ",
    "docker ps -a --format 'table {{.Names}}\\t{{.Image}}\\t{{.Status}}\\t{{.Ports}}' || true",
    "echo ''",
    "echo '== Docker container stats ==' ",
    "docker stats --no-stream --all --format 'table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}\\t{{.MemPerc}}\\t{{.NetIO}}\\t{{.BlockIO}}\\t{{.PIDs}}' || true",
    "echo ''",
    "echo '== Docker disk usage ==' ",
    "docker system df || true",
  ].join("\n");

  try {
    const result = await runSsmCommand(command, "portfolio-next runtime stats", 12000);
    return {
      ok: result.status === "Success",
      ...result,
    };
  } catch (error) {
    return {
      ok: false,
      status: "Failed",
      stdout: "",
      stderr: errorMessage(error),
    };
  }
}

async function runSsmCommand(command, comment, outputLimit) {
  const send = await ssm.send(
    new SendCommandCommand({
      InstanceIds: [config.instanceId],
      DocumentName: "AWS-RunShellScript",
      Parameters: { commands: [command] },
      Comment: comment,
    })
  );
  const commandId = send.Command?.CommandId;
  if (!commandId) {
    throw new Error("SSM did not return a command ID");
  }

  const deadline = Date.now() + 60000;
  let invocation = null;

  while (Date.now() < deadline) {
    try {
      invocation = await ssm.send(
        new GetCommandInvocationCommand({
          CommandId: commandId,
          InstanceId: config.instanceId,
        })
      );
      if (["Success", "Failed", "TimedOut", "Cancelled"].includes(invocation.Status)) {
        break;
      }
    } catch (error) {
      if (error.name !== "InvocationDoesNotExist") {
        throw error;
      }
    }

    await sleep(5000);
  }

  if (!invocation) {
    throw new Error(`SSM command ${commandId} did not produce an invocation`);
  }

  return {
    commandId,
    status: invocation.Status,
    stdout: truncate(invocation.StandardOutputContent || "", outputLimit),
    stderr: truncate(invocation.StandardErrorContent || "", outputLimit),
  };
}

async function sendReport(report) {
  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });

  const overallOk = !report.crashed && report.checks.every((check) => check.ok);
  const subjectPrefix = report.crashed ? "Monitor crashed" : overallOk ? "Monitor OK" : "Monitor warning";

  await transporter.sendMail({
    from: config.smtp.from,
    to: config.smtp.to,
    subject: `${subjectPrefix}: portfolio-next`,
    text: formatReport(report),
    html: formatHtmlReport(report),
  });
}

function formatReport(report) {
  const utc = report.startedAt.toISOString();
  const local = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "full",
    timeStyle: "long",
  }).format(report.startedAt);

  const lines = [
    report.crashed ? "❌ portfolio-next monitor crashed" : "✅ portfolio-next morning monitor report",
    "",
    `UTC timestamp: ${utc}`,
    `America/Toronto timestamp: ${local}`,
    "",
    "Checks:",
  ];

  for (const check of report.checks) {
    lines.push(`${check.ok ? "✅" : "❌"} ${check.name}: ${check.detail}`);
  }

  lines.push("", "Actions:");
  for (const action of report.actions) {
    lines.push(`- ${action}`);
  }

  if (report.runtime) {
    lines.push(
      "",
      "EC2 runtime stats:",
      `- Status: ${report.runtime.status}`,
      report.runtime.commandId ? `- Command ID: ${report.runtime.commandId}` : "",
      "- Output:",
      report.runtime.stdout || "(empty)"
    );

    if (report.runtime.stderr) {
      lines.push("- Errors:", report.runtime.stderr);
    }
  }

  if (report.ssm) {
    lines.push(
      "",
      "SSM command:",
      `- Command ID: ${report.ssm.commandId}`,
      `- Status: ${report.ssm.status}`,
      "- Stdout:",
      report.ssm.stdout || "(empty)",
      "- Stderr:",
      report.ssm.stderr || "(empty)"
    );
  }

  if (report.postRemediationHealth) {
    const health = report.postRemediationHealth;
    lines.push(
      "",
      "Post-remediation health:",
      `${health.ok ? "✅" : "❌"} HTTP ${health.status || "no status"} in ${health.responseTimeMs || "n/a"}ms after ${health.attempts} attempt(s)`
    );
  }

  return lines.join("\n");
}

function formatHtmlReport(report) {
  const utc = report.startedAt.toISOString();
  const local = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "full",
    timeStyle: "long",
  }).format(report.startedAt);
  const overallOk = !report.crashed && report.checks.every((check) => check.ok);
  const title = report.crashed
    ? "Portfolio Monitor Crashed"
    : overallOk
      ? "Portfolio Monitor OK"
      : "Portfolio Monitor Warning";
  const runtime = report.runtime ? parseRuntimeStats(report.runtime.stdout || "") : {};

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#172033;">
    <div style="max-width:980px;margin:0 auto;padding:24px;">
      <div style="background:#ffffff;border:1px solid #dce3ee;border-radius:8px;overflow:hidden;">
        <div style="padding:20px 24px;background:${overallOk ? "#0f766e" : "#b45309"};color:#ffffff;">
          <h1 style="margin:0;font-size:22px;line-height:1.3;">${escapeHtml(title)}</h1>
          <p style="margin:8px 0 0;font-size:14px;">${escapeHtml(config.productionUrl)} · ${escapeHtml(config.instanceId)} · ${escapeHtml(config.region)}</p>
        </div>

        <div style="padding:20px 24px;">
          ${section("Run Time", keyValueTable([
            ["UTC", utc],
            ["America/Toronto", local],
          ]))}

          ${section("Health Checks", renderTable(
            ["Status", "Check", "Details"],
            report.checks.map((check) => [
              statusBadge(check.ok ? "PASS" : "FAIL", check.ok),
              check.name,
              check.detail,
            ]),
            { rawColumns: [0] }
          ))}

          ${section("Actions", report.actions.length
            ? renderTable(["Action"], report.actions.map((action) => [action]))
            : muted("No actions recorded.")
          )}

          ${runtimeSection(report.runtime, runtime)}

          ${report.ssm ? section("Remediation Command", keyValueTable([
            ["Command ID", report.ssm.commandId],
            ["Status", report.ssm.status],
            ["Stdout", pre(report.ssm.stdout || "(empty)")],
            ["Stderr", pre(report.ssm.stderr || "(empty)")],
          ], [2, 3])) : ""}

          ${report.postRemediationHealth ? section("Post-Remediation Health", renderTable(
            ["Status", "HTTP", "Response Time", "Attempts"],
            [[
              statusBadge(report.postRemediationHealth.ok ? "PASS" : "FAIL", report.postRemediationHealth.ok),
              report.postRemediationHealth.status || "no status",
              `${report.postRemediationHealth.responseTimeMs || "n/a"}ms`,
              report.postRemediationHealth.attempts,
            ]],
            { rawColumns: [0] }
          )) : ""}
        </div>
      </div>
    </div>
  </body>
</html>`;
}

function runtimeSection(runtimeReport, runtime) {
  if (!runtimeReport) {
    return "";
  }

  const parts = [
    keyValueTable([
      ["Status", runtimeReport.ok ? statusBadge(runtimeReport.status, true) : statusBadge(runtimeReport.status, false)],
      ["Command ID", runtimeReport.commandId || "n/a"],
    ], [0]),
  ];

  parts.push(renderRuntimeTable("Host Memory", runtime["Host memory"]));
  parts.push(renderRuntimeTable("Host Disk", runtime["Host disk"]));
  parts.push(renderRuntimeTable("Docker Containers", runtime["Docker containers"]));
  parts.push(renderRuntimeTable("Docker Container Stats", runtime["Docker container stats"]));
  parts.push(renderRuntimeTable("Docker Disk Usage", runtime["Docker disk usage"]));

  if (runtimeReport.stderr) {
    parts.push(`<h3 style="margin:18px 0 8px;font-size:15px;">Errors</h3>${pre(runtimeReport.stderr)}`);
  }

  return section("EC2 Runtime Stats", parts.join(""));
}

function renderRuntimeTable(title, rawLines) {
  if (!rawLines || rawLines.length === 0) {
    return "";
  }

  const parsed = parseTableLines(rawLines);
  return `<h3 style="margin:18px 0 8px;font-size:15px;">${escapeHtml(title)}</h3>${
    parsed.rows.length > 0
      ? renderTable(parsed.headers, parsed.rows)
      : pre(rawLines.join("\n"))
  }`;
}

function parseRuntimeStats(stdout) {
  const sections = {};
  let current = null;

  for (const line of stdout.split(/\r?\n/)) {
    const match = line.match(/^== (.+) ==\s*$/);
    if (match) {
      current = match[1];
      sections[current] = [];
      continue;
    }

    if (current && line.trim()) {
      sections[current].push(line);
    }
  }

  return sections;
}

function parseTableLines(lines) {
  const split = (line) => line.trim().split(/\t+|\s{2,}/).filter(Boolean);
  const headers = split(lines[0] || "");
  const rows = lines.slice(1).map(split).filter((row) => row.length > 0);

  if (headers.length === 0 || rows.length === 0) {
    return { headers: [], rows: [] };
  }

  return { headers, rows };
}

function section(title, body) {
  return `<section style="margin:0 0 24px;">
    <h2 style="font-size:18px;line-height:1.3;margin:0 0 10px;color:#172033;">${escapeHtml(title)}</h2>
    ${body}
  </section>`;
}

function renderTable(headers, rows, options = {}) {
  const rawColumns = options.rawColumns || [];
  const headerHtml = headers
    .map((header) => `<th style="${thStyle()}">${escapeHtml(String(header))}</th>`)
    .join("");
  const rowHtml = rows
    .map((row) => `<tr>${headers.map((_, index) => {
      const value = row[index] ?? "";
      return `<td style="${tdStyle()}">${rawColumns.includes(index) ? value : escapeHtml(String(value))}</td>`;
    }).join("")}</tr>`)
    .join("");

  return `<div style="overflow-x:auto;">
    <table style="border-collapse:collapse;width:100%;font-size:13px;margin:0 0 8px;">
      <thead><tr>${headerHtml}</tr></thead>
      <tbody>${rowHtml}</tbody>
    </table>
  </div>`;
}

function keyValueTable(rows, rawValueRows = []) {
  const body = rows
    .map(([key, value], index) => `<tr>
      <td style="${tdStyle()}">${escapeHtml(String(key))}</td>
      <td style="${tdStyle()}">${rawValueRows.includes(index) ? value : escapeHtml(String(value))}</td>
    </tr>`)
    .join("");

  return `<div style="overflow-x:auto;">
    <table style="border-collapse:collapse;width:100%;font-size:13px;margin:0 0 8px;">
      <thead><tr><th style="${thStyle()}">Field</th><th style="${thStyle()}">Value</th></tr></thead>
      <tbody>${body}</tbody>
    </table>
  </div>`;
}

function statusBadge(label, ok) {
  return `<span style="display:inline-block;border-radius:999px;padding:3px 9px;font-size:12px;font-weight:700;background:${ok ? "#dcfce7" : "#fee2e2"};color:${ok ? "#166534" : "#991b1b"};">${escapeHtml(String(label))}</span>`;
}

function pre(value) {
  return `<pre style="white-space:pre-wrap;word-break:break-word;background:#f8fafc;border:1px solid #dce3ee;border-radius:6px;padding:10px;margin:0;font-size:12px;line-height:1.45;">${escapeHtml(String(value))}</pre>`;
}

function muted(value) {
  return `<p style="margin:0;color:#64748b;font-size:13px;">${escapeHtml(value)}</p>`;
}

function thStyle() {
  return "text-align:left;padding:8px 10px;border:1px solid #dce3ee;background:#eef2f7;color:#334155;font-weight:700;vertical-align:top;";
}

function tdStyle() {
  return "padding:8px 10px;border:1px solid #dce3ee;color:#172033;vertical-align:top;";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function requiredEnv(name) {
  const value = env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength)}\n...truncated...`;
}

function formatNumber(value) {
  return Number(value || 0).toFixed(2);
}

function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
