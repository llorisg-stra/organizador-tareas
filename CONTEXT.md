# 📋 Contexto del Proyecto - Ecosystem Bridge

> **Última actualización**: 2026-04-15  
> **Estado**: ✅ Infraestructura desplegada | 🚧 Integraciones pendientes

## Enlaces del Proyecto
- **Plane**: [https://tareas.slabs.studio](https://tareas.slabs.studio)
- **n8n**: [https://tareasn8n.slabs.studio](https://tareasn8n.slabs.studio)
- **NPM**: [http://51.77.202.96:81](http://51.77.202.96:81)
- **GitHub**: [https://github.com/llorisg-stra/organizador-tareas](https://github.com/llorisg-stra/organizador-tareas)

---

## 🎯 Objetivo del Proyecto

Plataforma centralizada de productividad para un equipo de 4 personas. Sincronización de tareas (Plane), código (GitHub), archivos (OneDrive) y comunicación (Teams) en un ecosistema unificado gestionado por agentes de IA.

---

## 🐳 Infraestructura (Cloud VPS)

### Servidor

| Campo | Valor |
|-------|-------|
| Proveedor | OVH / VPS |
| IP | `51.77.202.96` |
| Acceso SSH | `root@51.77.202.96` |
| Docker | ✅ Instalado |
| Firewall (UFW) | ✅ Puertos 80, 443, 81, 5678 |

> 🔐 **Seguridad**: Contraseña inicial usada para setup. Migrar a SSH keys.

### Servicios Desplegados

| Servicio | Rol | Acceso | Estado |
|----------|-----|--------|--------|
| **Nginx Proxy Manager** | Reverse Proxy / SSL | `51.77.202.96:81` | ✅ Operativo |
| **Plane (CE)** | Gestión de tareas | `https://tareas.slabs.studio` | ✅ Operativo |
| **n8n** | Automatización | `https://tareasn8n.slabs.studio` | ✅ Operativo (sin workflows activos) |

---

## 🔑 Credenciales

### Logins de Servicios

| Servicio | Email |
|----------|-------|
| **Plane** | `David@strategialabs.eu` |
| **n8n** | `david@strategialabs.eu` |
| **NPM** | *(default: admin@example.com — cambiar tras primer acceso)* |

> 🔐 **Passwords y API Keys** están en el archivo `.env` (local, no se sube a Git).

### Claves de Integración (Azure / APIs)

| Campo | Referencia |
|-------|------------|
| **Application (Client) ID** | Ver `.env` → `AZURE_CLIENT_ID` |
| **Directory (Tenant) ID** | Ver `.env` → `AZURE_TENANT_ID` |
| **Client Secret** | Ver `.env` → `AZURE_CLIENT_SECRET` |
| **Plane API Key** | Ver `.env` → `PLANE_API_KEY` |
| **Plane Workspace Slug** | `s-labs` |

---

## 🔗 GitHub

| Campo | Valor |
|-------|-------|
| Usuario | llorisg-stra |
| Repositorio | organizador-tareas |
| URL | <https://github.com/llorisg-stra/organizador-tareas> |
| Rama principal | main |

- [x] Repo creado en GitHub
- [ ] Primer push realizado
- [ ] Integración Plane ↔ GitHub activada

> ℹ️ **Nota**: Repo temporal en `llorisg-stra`. Se migrará a organización de empresa cuando se reorganice.

---

## 📊 Estado Actual (Auditoría 15-04-2026)

### Fase 1a: Infraestructura ✅ COMPLETADA
- [x] Planificación completada (Handoff recibido)
- [x] Decisiones arquitectónicas tomadas
- [x] Cambio a VPS Personal decidido (13-04-2026)
- [x] Configuración base del VPS (Docker, Firewall)
- [x] Despliegue de NPM + SSL (Cloudflare Full)
- [x] Despliegue de Plane (workspace `S-LABS`, 1 proyecto, API Token creado)
- [x] Despliegue de n8n (1 workflow `bridge-gateway` creado, inactivo)
- [x] Prueba de conectividad Plane API exitosa (issues SLABS-8 y SLABS-9)

### Fase 1b: Integraciones 🚧 PENDIENTE
- [ ] Crear repo GitHub `organizador-tareas` + primer push
- [ ] Integración GitHub ↔ Plane (nativa)
- [ ] Integración M365 (Entra ID) ↔ n8n (OAuth2 + workflows)
- [ ] Integración Antigravity ↔ Plane (MCP Server)

### Equipo en Plane

| Miembro | Email | Rol | Estado |
|---------|-------|-----|--------|
| David | david@strategialabs.eu | Admin | ✅ Activo |
| Gabriel | gabriel@strategialabs.eu | Admin | ⏳ Invitación pendiente |

### n8n: Workflows

| Workflow | Tipo | Estado | Ejecuciones |
|----------|------|--------|-------------|
| `bridge-gateway` | Webhook → Plane API | ⚠️ Inactivo | 0 |

---

## 🔧 Decisiones Técnicas

### Stack

| Componente | Tecnología | Notas |
|------------|------------|-------|
| **Tareas** | Plane (Self-hosted) | Docker Compose |
| **Proxy** | Nginx Proxy Manager | Gestión visual de SSL |
| **Automatización** | n8n | Puente Plane <-> M365 |
| **IA Local** | Qwen 3.5 27B | En PC local (RTX 5090) vía Ollama |
| **IA Premium** | Claude Opus 4.6 | Fallback vía API |

### Integraciones (Plan)

- [ ] **GitHub Nativo**: Sincronización de PRs con tareas de Plane.
- [ ] **Microsoft Graph API**: Conexión OneDrive/Teams vía n8n.
- [ ] **MCP Plane**: Conexión de Antigravity al motor de tareas.

---

## 📚 Recursos Importantes

- Handoff original: `../Orden de tareas/ecosystem_bridge_handoff.md`
- Manual workflows: `docs/MANUAL-WORKFLOWS.md`
- Hoja de ruta: Ver artifact `implementation_plan.md` de la sesión actual

---

## 📝 Notas y Decisiones

### 2026-04-15 — Auditoría completa
- **Auditoría de todos los servicios**: Se verificó Plane (operativo, 1 proyecto, 9 issues tutorial), n8n (1 workflow inactivo, 0 credenciales), GitHub (repo no existe).
- **CONTEXT.md reescrito** para reflejar estado real vs aspiracional.
- **Credenciales** de Plane y n8n documentadas.
- **Hoja de ruta** creada con 4 bloques priorizados.

### 2026-04-13
- **Cambio de Infraestructura**: Migración de Synology (local) a **VPS propio** para facilitar accesibilidad externa.
- **Sincronización de Contexto**: Agente ha leído handoff y asume Fase 1 como prioridad.

---

## 🚀 Próximos Pasos

1. **Limpiar Plane**: Borrar issues de tutorial, dejar workspace limpio
2. **Crear repo GitHub**: `organizador-tareas` + primer push
3. **Conectar GitHub ↔ Plane**: Integración nativa
4. **Conectar M365 ↔ n8n**: OAuth2 + workflows Teams/OneDrive
5. **Configurar MCP Plane**: Antigravity gestiona tareas desde chat

---

## 💡 Cómo usar este archivo

**Al iniciar cada sesión:**
> `/inicio` — Lee CONTEXT.md y muestra resumen

**Al terminar cada sesión:**
> `/fin` — Actualiza checklists y sección de Notas
