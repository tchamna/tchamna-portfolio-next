import nodemailer from "nodemailer";

const required = [
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "SMTP_TO",
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

async function main() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: "Monitor crashed: portfolio-next",
    text: [
      "❌ the monitor crashed.",
      "",
      `UTC timestamp: ${new Date().toISOString()}`,
      `Workflow: ${process.env.GITHUB_WORKFLOW || "unknown"}`,
      `Run: ${process.env.GITHUB_SERVER_URL || ""}/${process.env.GITHUB_REPOSITORY || ""}/actions/runs/${process.env.GITHUB_RUN_ID || ""}`,
    ].join("\n"),
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
