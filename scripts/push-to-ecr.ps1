param(
  [string]$AwsAccountId,
  [string]$Region = "us-east-1",
  [string]$RepoName = "portfolio-next",
  [string]$ImageTag = "latest"
)

if (-not $AwsAccountId) {
  Write-Host "Usage: .\push-to-ecr.ps1 -AwsAccountId <aws_account_id> [-Region us-east-1] [-RepoName portfolio-next]"
  exit 1
}

$ecrUri = "$AwsAccountId.dkr.ecr.$Region.amazonaws.com/$RepoName:$ImageTag"

Write-Host "Building Docker image..."
docker build -t $RepoName:latest .

Write-Host "Ensuring ECR repository exists..."
try {
  aws ecr describe-repositories --repository-names $RepoName --region $Region | Out-Null
} catch {
  aws ecr create-repository --repository-name $RepoName --region $Region | Out-Null
}

Write-Host "Logging in to ECR..."
aws ecr get-login-password --region $Region | docker login --username AWS --password-stdin "$AwsAccountId.dkr.ecr.$Region.amazonaws.com"

Write-Host "Tagging and pushing image to ECR: $ecrUri"
docker tag $RepoName:latest $ecrUri
docker push $ecrUri

Write-Host "Image pushed: $ecrUri"
Write-Host "Next: register an ECS task definition and create a Fargate service (see README-DEPLOY.md)"
