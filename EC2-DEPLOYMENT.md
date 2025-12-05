# EC2 Deployment Setup Guide

## Port Configuration

This app runs on **port 3001** to coexist with other apps on the same EC2 instance.
- Container internal port: 3000 (Next.js default)
- EC2 external port: 3001 (mapped via Docker)
- Access URL: http://ec2-13-220-111-43.compute-1.amazonaws.com:3001

## Required GitHub Secrets

Add these secrets at: https://github.com/tchamna/tchamna-portfolio-next/settings/secrets/actions

1. **AWS_ACCESS_KEY_ID** - Your AWS access key ID
2. **AWS_SECRET_ACCESS_KEY** - Your AWS secret access key  
3. **EC2_SSH_KEY** - Your EC2 private key (entire contents of .pem file)

## EC2 Instance Setup

SSH into your EC2 instance and run (skip if already installed):

```bash
# Update system
sudo yum update -y

# Install Docker (if not already installed)
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install AWS CLI (if not already installed)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS CLI (use same credentials as GitHub secrets)
aws configure
```

## Security Group Settings

Make sure your EC2 security group allows:
- **Port 3001** (HTTP) - for this portfolio app
- **Port 22** (SSH) - for deployment (restrict to GitHub Actions IPs if possible)
- Keep other ports for your existing apps

## Cost Comparison

### AWS Amplify
- **Build minutes**: $0.01/minute
- **Data transfer**: $0.15/GB
- **Typical monthly cost**: $1-5 for small sites

### EC2 (t3.micro or t2.micro)
- **Instance**: ~$8-10/month (on-demand) or ~$5/month (reserved)
- **Data transfer**: $0.09/GB (first 10 TB)
- **Total**: ~$8-15/month

### Recommendation
- **Amplify**: Better for low/medium traffic, automatic scaling, zero maintenance
- **EC2**: More control, predictable costs, good for learning DevOps

## Testing Deployment

After setup, visit: **http://ec2-13-220-111-43.compute-1.amazonaws.com:3001**

## Multiple Apps on Same EC2

Your apps can coexist on different ports:
- **App 1**: Port 80 or 3000 (your existing app)
- **Portfolio**: Port 3001 (this Next.js app)
- **App 3**: Port 3002, 8080, etc.

Each Docker container can map to a different host port.

## Optional: Nginx Reverse Proxy

For production, consider using Nginx to:
- Serve multiple apps on port 80 with different subdomains/paths
- Enable HTTPS with SSL certificates
- Example: `portfolio.yourdomain.com` → port 3001

## Troubleshooting

SSH into EC2 to check logs:
```bash
ssh -i your-key.pem ec2-user@ec2-13-220-111-43.compute-1.amazonaws.com

# Check running containers
docker ps

# View portfolio app logs
docker logs portfolio-next

# Check if port 3001 is in use
sudo netstat -tuln | grep 3001

# Restart the app
docker restart portfolio-next
```
