# Portfolio Monitor

Daily monitoring for the EC2-hosted `portfolio-next` site. The agent runs from GitHub Actions, checks the production URL and EC2 health, sends a morning SMTP report every run, and uses AWS Systems Manager instead of SSH for in-instance remediation.

## Repo-Derived Configuration

- Region: `us-east-1`
- Instance ID: `i-06e1cb3f5231e7804`
- Production URL: `https://portfolio.tchamna.com/`
- Runtime: Docker container named `portfolio-next`
- Restart command: `docker restart portfolio-next`
- Node version: `20.11`, matching the Dockerfile base image

## What It Checks

1. HTTP `GET` against `PRODUCTION_URL`; expects `200` and response time under 3 seconds. It retries 3 times with 2s, 4s, and 8s backoff.
2. TLS certificate expiration; fails if fewer than 14 days remain.
3. EC2 instance state; expects `running`.
4. EC2 system and instance status checks; expects both to be `ok`.
5. CloudWatch metrics for the last hour; flags average CPU over 85% or any status check failures.

## Safe Remediation

- If HTTP fails while the instance is running and EC2 status checks are ok, the agent sends an SSM `AWS-RunShellScript` command using `RESTART_COMMAND`.
- If the instance is stopped, the agent starts only `EC2_INSTANCE_ID`.
- If the instance is running but EC2 status checks are failing, the agent reports the problem and does not reboot.
- It never terminates instances, modifies security groups, changes IAM, touches AMIs, touches volumes, or acts on other instances.

## GitHub Secrets

Create these secrets in the repository settings:

- `AWS_ACCESS_KEY_ID`: redacted AWS access key
- `AWS_SECRET_ACCESS_KEY`: redacted AWS secret key
- `SMTP_HOST`: example `smtp.gmail.com`
- `SMTP_PORT`: example `587`
- `SMTP_SECURE`: `false` for STARTTLS on port 587, `true` for implicit TLS on port 465
- `SMTP_USER`: redacted SMTP username
- `SMTP_PASS`: redacted SMTP password or app password
- `SMTP_FROM`: example `Portfolio Monitor <redacted@example.com>`
- `SMTP_TO`: destination email address

The workflow uses AWS access keys because the existing deploy workflow is already configured that way and there is no OIDC role/trust configuration in this repo. OIDC is preferable once an AWS IAM role trusts this GitHub repository.

## Local Testing

From PowerShell:

```powershell
cd C:\Users\tcham\Wokspace\portfolio\portfolio-next
$env:AWS_REGION="us-east-1"; $env:EC2_INSTANCE_ID="i-06e1cb3f5231e7804"; $env:PRODUCTION_URL="https://portfolio.tchamna.com/"; $env:RESTART_COMMAND="docker restart portfolio-next"; $env:SMTP_HOST="<smtp-host>"; $env:SMTP_PORT="587"; $env:SMTP_SECURE="false"; $env:SMTP_USER="<smtp-user>"; $env:SMTP_PASS="<smtp-password>"; $env:SMTP_FROM="Portfolio Monitor <from@example.com>"; $env:SMTP_TO="<to@example.com>"; npm run monitor
```

That is the one-command end-to-end test before scheduling. It runs the same monitor that GitHub Actions runs and sends the SMTP report.

## Manual Workflow Test

Open the repository on GitHub, go to **Actions**, choose **Monitor Portfolio**, then select **Run workflow**.

## Disable The Monitor

Edit `.github/workflows/monitor.yml` and remove or comment the `schedule` block. Keep `workflow_dispatch` if you still want manual test runs.

## Schedule

The workflow runs at `0 10 * * *` UTC. That is 6:00 AM America/Toronto during daylight saving time. When Toronto returns to standard time, 10:00 UTC becomes 5:00 AM local; change the cron to `0 11 * * *` if exact 6:00 AM standard time is required.

## Pre-Flight SSM Check

Before trusting remediation, run this locally:

```bash
aws ssm send-command \
  --instance-ids <INSTANCE_ID> \
  --document-name "AWS-RunShellScript" \
  --parameters 'commands=["echo hello from ssm"]' \
  --region <REGION>
```

Then check the result:

```bash
aws ssm get-command-invocation \
  --command-id <COMMAND_ID> \
  --instance-id <INSTANCE_ID> \
  --region <REGION>
```

If `StandardOutputContent` is `hello from ssm`, SSM is wired up correctly.

## IAM Policy

Replace `REGION`, `ACCOUNT_ID`, and `INSTANCE_ID` before attaching this policy to the GitHub Actions IAM user or role.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DescribeOnlyEc2",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceStatus"
      ],
      "Resource": "*"
    },
    {
      "Sid": "StartOnlyPortfolioInstance",
      "Effect": "Allow",
      "Action": "ec2:StartInstances",
      "Resource": "arn:aws:ec2:REGION:ACCOUNT_ID:instance/INSTANCE_ID"
    },
    {
      "Sid": "ReadCloudWatchMetrics",
      "Effect": "Allow",
      "Action": "cloudwatch:GetMetricStatistics",
      "Resource": "*"
    },
    {
      "Sid": "SendSsmCommandOnlyToPortfolioInstance",
      "Effect": "Allow",
      "Action": "ssm:SendCommand",
      "Resource": [
        "arn:aws:ec2:REGION:ACCOUNT_ID:instance/INSTANCE_ID",
        "arn:aws:ssm:REGION::document/AWS-RunShellScript"
      ]
    },
    {
      "Sid": "ReadSsmCommandResults",
      "Effect": "Allow",
      "Action": [
        "ssm:GetCommandInvocation",
        "ssm:DescribeInstanceInformation"
      ],
      "Resource": "*"
    }
  ]
}
```

For this repo's current instance, replace:

- `REGION` with `us-east-1`
- `INSTANCE_ID` with `i-06e1cb3f5231e7804`
- `ACCOUNT_ID` with your AWS account ID
