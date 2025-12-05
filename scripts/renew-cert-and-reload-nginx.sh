#!/bin/bash

##############################################################################
# Certificate Renewal and Nginx Reload Script
# 
# Purpose: Automatically renew Let's Encrypt SSL certificates and reload
#          Nginx to apply updates. Designed to run via cron daily.
#
# Usage: ./renew-cert-and-reload-nginx.sh
#
# Cron Setup (runs daily at 3 AM):
# 0 3 * * * /home/ec2-user/renew-cert-and-reload-nginx.sh >> /var/log/cert-renewal.log 2>&1
##############################################################################

set -e

# Configuration
CERTBOT="/usr/bin/certbot"
NGINX="/usr/sbin/nginx"
LOG_FILE="/var/log/cert-renewal.log"
EMAIL="your-email@example.com"  # Optional: for renewal notifications
DOMAINS=("portfolio.tchamna.com" "rag.tchamna.com")  # List all domains needing renewal

# Log function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "Starting certificate renewal process..."

# Check if certbot exists
if [ ! -f "$CERTBOT" ]; then
    log "ERROR: certbot not found at $CERTBOT"
    exit 1
fi

# Check if nginx exists
if [ ! -f "$NGINX" ]; then
    log "ERROR: nginx not found at $NGINX"
    exit 1
fi

# Attempt renewal for all domains
renewal_needed=false

for domain in "${DOMAINS[@]}"; do
    log "Checking certificate for $domain..."
    
    if $CERTBOT renew --cert-name "$domain" --quiet --no-eff-email 2>&1 | tee -a "$LOG_FILE"; then
        log "Successfully renewed certificate for $domain"
        renewal_needed=true
    else
        log "Certificate for $domain not yet due for renewal or renewal failed"
    fi
done

# Validate Nginx configuration
log "Validating Nginx configuration..."
if $NGINX -t 2>&1 | tee -a "$LOG_FILE"; then
    log "Nginx configuration is valid"
    
    # Reload Nginx to apply certificate updates
    log "Reloading Nginx..."
    if systemctl reload nginx 2>&1 | tee -a "$LOG_FILE"; then
        log "Successfully reloaded Nginx"
    else
        log "ERROR: Failed to reload Nginx"
        exit 1
    fi
else
    log "ERROR: Nginx configuration validation failed"
    exit 1
fi

log "Certificate renewal process completed successfully"
exit 0
