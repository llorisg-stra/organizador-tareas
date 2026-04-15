#!/bin/bash
# ============================================================
# ECOSYSTEM BRIDGE — VPS Setup Script (Fase 1)
# Servidor: root@51.77.202.96
# Ejecutar como root en el VPS
# ============================================================

set -e  # Salir si algún comando falla
echo "🚀 Iniciando setup del Ecosystem Bridge en VPS..."

# ============================================================
# 1. ACTUALIZAR SISTEMA
# ============================================================
echo "📦 Actualizando sistema..."
apt-get update -y && apt-get upgrade -y
apt-get install -y curl git nano ufw htop

# ============================================================
# 2. INSTALAR DOCKER
# ============================================================
echo "🐳 Instalando Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
    echo "✅ Docker instalado"
else
    echo "✅ Docker ya estaba instalado: $(docker --version)"
fi

# ============================================================
# 3. INSTALAR DOCKER COMPOSE (plugin v2)
# ============================================================
echo "🐳 Verificando Docker Compose..."
if ! docker compose version &> /dev/null; then
    apt-get install -y docker-compose-plugin
fi
echo "✅ $(docker compose version)"

# ============================================================
# 4. CREAR ESTRUCTURA DE CARPETAS
# ============================================================
echo "📁 Creando estructura de directorios..."
mkdir -p /opt/ecosystem/{nginx-proxy-manager,plane,n8n}
mkdir -p /opt/ecosystem/nginx-proxy-manager/data
mkdir -p /opt/ecosystem/nginx-proxy-manager/letsencrypt

# ============================================================
# 5. CONFIGURAR FIREWALL (UFW)
# ============================================================
echo "🔥 Configurando UFW..."
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 81/tcp   # NPM admin panel (solo temporal — cerrar tras configurar)
ufw --force enable
echo "✅ Firewall configurado"

# ============================================================
# 6. DESPLEGAR NGINX PROXY MANAGER
# ============================================================
echo "🔀 Desplegando Nginx Proxy Manager..."
cat > /opt/ecosystem/nginx-proxy-manager/docker-compose.yml << 'EOF'
version: "3.8"
services:
  app:
    image: jc21/nginx-proxy-manager:latest
    container_name: nginx-proxy-manager
    restart: unless-stopped
    ports:
      - "80:80"       # HTTP
      - "443:443"     # HTTPS
      - "81:81"       # Admin Panel
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
EOF

cd /opt/ecosystem/nginx-proxy-manager
docker compose up -d
echo "✅ Nginx Proxy Manager arrancado"

# ============================================================
# 7. INFO FINAL
# ============================================================
echo ""
echo "============================================================"
echo "✅ FASE 1 - PASO 1 COMPLETADO"
echo "============================================================"
echo "🌐 Panel de NPM: http://51.77.202.96:81"
echo "📧 Login inicial: admin@example.com"
echo "🔑 Password inicial: changeme"
echo ""
echo "⚠️  IMPORTANTE:"
echo "  1. Accede al panel en http://51.77.202.96:81"
echo "  2. Cambia las credenciales por defecto INMEDIATAMENTE"
echo "  3. Cuando tengas el dominio, configure los subdominios aquí"
echo ""
echo "📋 SIGUIENTE PASO:"
echo "  Ejecutar: bash /opt/ecosystem/deploy-plane.sh"
echo "============================================================"
