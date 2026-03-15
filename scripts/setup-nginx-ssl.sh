#!/bin/bash
# Setup Nginx reverse proxy with SSL for portfolio.tchamna.com
# Run this on your EC2 instance after Docker is set up

set -e

echo "=== Installing Nginx ==="
sudo yum install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

echo "=== Installing Certbot for SSL ==="
sudo yum install certbot python3-certbot-nginx -y

echo "=== Creating Nginx configuration ==="
sudo tee /etc/nginx/conf.d/portfolio.conf > /dev/null <<'EOF'
server {
    listen 80;
    server_name portfolio.tchamna.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

echo "=== Testing Nginx configuration ==="
sudo nginx -t

echo "=== Reloading Nginx ==="
sudo systemctl reload nginx

echo ""
echo "=== Next Steps ==="
echo "1. Add DNS A record: portfolio.tchamna.com -> 18.208.117.82"
echo "2. Wait for DNS to propagate (5-30 minutes)"
echo "3. Run this command to enable SSL:"
echo "   sudo certbot --nginx -d portfolio.tchamna.com"
echo ""
echo "=== Security Group Requirements ==="
echo "Make sure your EC2 security group allows:"
echo "  - Port 80 (HTTP)"
echo "  - Port 443 (HTTPS)"
echo "  - Port 3001 can be removed (only needed internally)"
