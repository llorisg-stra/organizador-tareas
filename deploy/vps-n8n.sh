#!/bin/bash
# ============================================================
# ECOSYSTEM BRIDGE — n8n Setup Script
# Servidor: root@51.77.202.96
# ============================================================

set -e
echo "🚀 Iniciando despliegue de n8n..."

mkdir -p /opt/ecosystem/n8n
cd /opt/ecosystem/n8n

cat > docker-compose.yml << 'EOF'
version: "3.7"

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=51.77.202.96
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - NODE_ENV=production
      - WEBHOOK_URL=http://51.77.202.96:5678/
      - GENERIC_TIMEZONE=Europe/Madrid
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
EOF

echo "Levantando contenedor de n8n..."
docker compose up -d

# Modificar UFW para n8n temporalmente
echo "Asegurando el puerto de n8n..."
ufw allow 5678/tcp || true

echo "============================================================"
echo "✅ FASE 1 - PASO 3 COMPLETADO: n8n desplegado"
echo "============================================================"
echo "n8n estará disponible en unos segundos en:"
echo "http://51.77.202.96:5678"
EOF
