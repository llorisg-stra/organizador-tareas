#!/bin/bash
# ============================================================
# ECOSYSTEM BRIDGE — Plane Setup Script
# Servidor: root@51.77.202.96
# ============================================================

set -e
echo "🚀 Iniciando despliegue de Plane CE (Latest Release)..."

cd /opt/ecosystem/plane

# Hacemos down si había algo levantado fallando
docker compose down || true

echo "Ajustando variables de puerto en .env..."
# Forzar las variables correctas
echo -e "\nLISTEN_HTTP_PORT=8000" >> .env
echo "LISTEN_HTTPS_PORT=4430" >> .env

# 3. Arrancar Docker Compose
echo "Levantando contenedores de Plane..."
docker compose up -d

echo "============================================================"
echo "✅ FASE 1 - PASO 2 COMPLETADO: Plane desplegado"
echo "============================================================"
echo "Plane empezará a estar disponible en un par de minutos en:"
echo "http://51.77.202.96:8000"
EOF
