# EC2 Deployment Setup Guide

## Port Configuration

This app runs on **port 3001** to coexist with other apps on the same EC2 instance.
- Container internal port: 3000 (Next.js default)
- EC2 external port: 3001 (mapped via Docker)
- Direct URL: http://18.208.117.82:3001
- Domain URL: https://portfolio2.tchamna.com (via Nginx reverse proxy)

## Required GitHub Secrets

Add these secrets at: https://github.com/tchamna/tchamna-portfolio-next/settings/secrets/actions

1. **AWS_ACCESS_KEY_ID** - Your AWS access key ID
2. **AWS_SECRET_ACCESS_KEY** - Your AWS secret access key

`EC2_SSH_KEY` is no longer required for CI/CD. Deployments now use AWS Systems Manager (SSM).

## EC2 Instance Setup

SSH into your EC2 instance and run (skip anything already installed):

```bash
# Update system
sudo yum update -y

# Install Docker
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install and start SSM Agent if needed
sudo yum install amazon-ssm-agent -y
sudo systemctl enable amazon-ssm-agent
sudo systemctl start amazon-ssm-agent

# Install AWS CLI if needed
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

## IAM Requirements

Attach an IAM instance profile to the EC2 instance with these permissions:

- `AmazonSSMManagedInstanceCore`
- `AmazonEC2ContainerRegistryReadOnly`

Without those policies, the GitHub Actions workflow will not be able to send SSM commands or pull the Docker image from ECR on the instance.

## Security Group Settings

Make sure your EC2 security group allows:
- **Port 3001** (HTTP) - for this portfolio app
- **Port 80** and **443** if you are using Nginx and TLS
- **Port 22** (SSH) only from your own IP for manual access

Port 22 no longer needs to be open for GitHub Actions deployments.

## Testing Deployment

After setup:
- Direct: **http://18.208.117.82:3001**
- With domain (after Nginx setup): **https://portfolio2.tchamna.com**

## Multiple Apps on Same EC2

Your apps can coexist on different ports:
- **App 1**: Port 80 or 3000
- **Portfolio**: Port 3001
- **App 3**: Port 3002, 8080, etc.

Each Docker container can map to a different host port.

## Nginx Reverse Proxy Setup

To access via `https://portfolio2.tchamna.com`:
1. Add DNS A record: `portfolio2.tchamna.com` -> `18.208.117.82`
2. Run the setup script in `scripts/setup-nginx-ssl.sh`
3. Enable SSL with: `sudo certbot --nginx -d portfolio2.tchamna.com`

## Troubleshooting

For manual checks, you can still SSH from your own machine:

```bash
ssh -i your-key.pem ec2-user@18.208.117.82

# Check running containers
docker ps

# View portfolio app logs
docker logs portfolio-next

# Check if port 3001 is in use
sudo netstat -tuln | grep 3001

# Check SSM agent status
sudo systemctl status amazon-ssm-agent

# Restart the app
docker restart portfolio-next
```
