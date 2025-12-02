AWS deployment notes (ECR + ECS Fargate) — region: N. Virginia (us-east-1)

Prerequisites
- AWS CLI configured (`aws configure`) with credentials that have ECR/ECS/IAM permissions.
- Docker installed and working locally.
- (Optional) GitHub repo to use the included Actions workflow.

1) Build & push image to ECR (local, PowerShell)

Replace `<AWS_ACCOUNT_ID>` below with your account id.

```powershell
cd c:\Users\tcham\Wokspace\portfolio\portfolio-next
# Build & push using provided script (creates repo if missing)
.\scripts\push-to-ecr.ps1 -AwsAccountId <AWS_ACCOUNT_ID> -Region us-east-1 -RepoName portfolio-next -ImageTag latest
```

2) Register task definition (example)

Edit `ecs/task-def.json` and replace `<AWS_ACCOUNT_ID>` and ensure `executionRoleArn` points to a valid `ecsTaskExecutionRole` (create via AWS console or use the ECS role creation wizard).

Register the task definition:

```powershell
aws ecs register-task-definition --cli-input-json file://ecs/task-def.json --region us-east-1
```

3) Create ECS cluster and service (console recommended)

- For a simple test you can run a single task in the ECS console into the default VPC using Fargate and assign a public IP.
- For production, create an Application Load Balancer (ALB), target group, listeners (80/443), security groups, and attach the ECS service to the target group.

CLI example to create cluster and run a task (simplified):

```powershell
# create cluster
aws ecs create-cluster --cluster-name portfolio-next-cluster --region us-east-1

# create service (requires task definition family name and subnets/security-groups)
# This is intentionally left as manual because networking choices (VPC/subnets/ALB) vary per account.
```

4) GitHub Actions (optional)

The workflow `.github/workflows/ecr-publish.yml` will build and push the image to ECR when you push to `main`. Add the following repo secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

5) Notes & next steps
- If you want, I can generate CloudFormation / CDK to create the ALB, ECS service, task role, and required networking automatically — tell me and I'll prepare it for `us-east-1`.
