# 📋 Contexto del Proyecto - Ecosystem Bridge

> **Última actualización**: 2026-04-16 (00:23 CEST)  
> **Estado**: ✅ Pipeline GitHub→Plane→Teams operativo | ✅ Pipeline Plane→Teams (Done) operativo

## Enlaces del Proyecto
- **Plane**: [https://tareas.slabs.studio](https://tareas.slabs.studio)
- **n8n**: [https://tareasn8n.slabs.studio](https://tareasn8n.slabs.studio)
- **NPM**: [http://51.77.202.96:81](http://51.77.202.96:81)
- **GitHub**: [https://github.com/llorisg-stra/organizador-tareas](https://github.com/llorisg-stra/organizador-tareas)

---

## 🎯 Objetivo del Proyecto

Plataforma centralizada de productividad para un equipo de 4 personas. Sincronización de tareas (Plane), código (GitHub), archivos (OneDrive) y comunicación (Teams) en un ecosistema unificado gestionado por agentes de IA.

### Equipo

| Persona | Rol | GitHub | Email |
|---------|-----|--------|-------|
| **Gabi** | Dirección técnica | `llorisg-stra` (Owner org) | gabriel@strategialabs.eu |
| **David** | Desarrollo | `Davidstrategia` (Admin org) | david@strategialabs.eu |
| **Cristian** | Soporte | — | cristian@strategialabs.eu |
| **Nayara** | Administración | — | nayara@strategialabs.eu |

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
| **n8n** | Automatización | `https://tareasn8n.slabs.studio` | ✅ Operativo (3 workflows, 2 activos) |

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
| **n8n API Key** | Ver `.env` → `N8N_API_KEY` (label: "Ecosystem Bridge", expira 2030) |

---

## 🔗 GitHub

### Organización: `slabs-studio`

| Campo | Valor |
|-------|-------|
| Organización | [slabs-studio](https://github.com/slabs-studio) |
| Owner | Gabi (`llorisg-stra`) |
| Admin | David (`Davidstrategia`) — invitación enviada 16-04-2026 |

### Repositorios

| Repo | URL | Descripción |
|------|-----|-------------|
| **organizador-tareas** | [slabs-studio/organizador-tareas](https://github.com/slabs-studio/organizador-tareas) | Ecosystem Bridge — proyecto central |

| Campo | Valor |
|-------|-------|
| Rama principal | main |
| GitHub Action | `plane-sync.yml` ✅ |
| Repo personal (legacy) | `llorisg-stra/organizador-tareas` (original, archivar cuando convenga) |

- [x] Organización GitHub creada (16-04-2026)
- [x] Repo forkeado a la org
- [x] David invitado como admin
- [ ] Actualizar webhook de n8n para apuntar a `slabs-studio/organizador-tareas`
- [ ] Actualizar GitHub Action en el repo de la org

---

## 📊 Estado Actual (Auditoría 15-04-2026)

### Fase 1a: Infraestructura ✅ COMPLETADA
- [x] Planificación completada (Handoff recibido)
- [x] Decisiones arquitectónicas tomadas
- [x] Cambio a VPS Personal decidido (13-04-2026)
- [x] Configuración base del VPS (Docker, Firewall)
- [x] Despliegue de NPM + SSL (Cloudflare Full)
- [x] Despliegue de Plane (workspace `S-LABS`, 1 proyecto, API Token creado)
- [x] Despliegue de n8n (workflows activos)
- [x] Prueba de conectividad Plane API exitosa

### Fase 1b: Integraciones ✅ COMPLETADA
- [x] Crear repo GitHub `organizador-tareas` + primer push
- [x] GitHub Action → n8n webhook → Plane (actualiza estado de tareas)
- [x] Integración M365 (Azure App + OAuth2 en n8n)
- [x] Notificaciones Teams (canal #dev en equipo ORDEN)
- [x] MCP Plane configurado en Antigravity (pendiente reinicio para activar)

### Fase 1c: Organización del Equipo ✅ COMPLETADA
- [x] Definir estructura de proyectos en Plane (multi-proyecto, S-LABS como ops central)
- [x] Definir estados de tareas y workflow de trabajo (5 estados confirmados)
- [x] Labels configurados: desarrollo, soporte, admin, infra, docs, urgente
- [x] Invitación reenviada a Gabriel (Admin)
- [ ] Cambiar timezone workspace a Europe/Madrid (manual, Settings > General)
- [ ] Invitar a Cristian + Nayara (cuando sea relevante)
- [ ] Guía de uso para el equipo

---

## 🔄 Pipeline Automatizado (Operativo)

```
GitHub PR (con SLABS-XX en título)
    │
    ├── GitHub Action dispara webhook a n8n
    │
    ├── n8n: Extrae SLABS-XX → Busca issue en Plane
    │
    ├── n8n: Actualiza estado en Plane
    │   ├── PR abierta     → 🚀 In Progress
    │   ├── PR merged       → ✅ Done
    │   └── PR cerrada      → ❌ Backlog
    │
    └── n8n: Notifica en Teams (#dev / ORDEN)
        └── Emoji + Issue + Autor + Link PR
```

---

## 💬 Microsoft Teams — Equipo ORDEN

| Canal | ID | Uso |
|-------|-----|-----|
| **#dev** | `19:f79ad614c65a428cb4407515b79e4977@thread.tacv2` | Notificaciones automáticas: PRs, CI/CD |
| **#tareas** | `19:d07762c26b254b6bb3bc076926a3d769@thread.tacv2` | ✅ Notificaciones Plane → tareas completadas |
| **#General** | *(default)* | Chat general del equipo |

**Team ID ORDEN**: `3a629f45-b3f0-49e8-9180-e634250e2aa0`

---

## 📡 n8n: Workflows

| Workflow | ID | Tipo | Estado | Ejecuciones |
|----------|----|------|--------|-------------|
| `github-to-plane` | `OOa9H7WgrGG0FwQJ` | Webhook → Plane + Teams (#dev) | ✅ Activo | 18+ |
| `Plane a Teams (Operaciones)` | `JzW46ruUKlsPlUaW` | Plane webhook → IF Done → Teams (#tareas) | ✅ Activo | 27+ |
| `bridge-gateway` | `9eNVaRAfGeQUHH1H` | Webhook → Plane (legacy) | ⚠️ Inactivo | 0 |

### Credenciales n8n

| Credencial | ID | Tipo |
|------------|-----|------|
| **Header Auth (Plane)** | `6Xee9FW2VxPbesAa` | httpHeaderAuth |
| **Microsoft Teams** | `3EgTlEWOlKcNOalf` | microsoftTeamsOAuth2Api |
| **Microsoft Graph Security** | `M0SWKN7KqAxH2UFs` | microsoftGraphSecurityOAuth2Api |

---

## 🤖 MCP Servers (Antigravity)

| Server | Estado | Config |
|--------|--------|--------|
| **GitHub** | ✅ Operativo | Token PAT en `mcp_config.json` |
| **StitchMCP** | ✅ Operativo | API Key |
| **NotebookLM** | ✅ Operativo | Cookie auth |
| **Plane** | ⏳ Configurado, pendiente reinicio | uvx + API Key + self-hosted URL |

---

## 🔧 Decisiones Técnicas

### Stack

| Componente | Tecnología | Notas |
|------------|------------|-------|
| **Tareas** | Plane (Self-hosted) | Docker Compose |
| **Proxy** | Nginx Proxy Manager | Gestión visual de SSL |
| **Automatización** | n8n | Puente GitHub ↔ Plane ↔ Teams |
| **IA Local** | Qwen 3.5 27B | En PC local (RTX 5090) vía LM Studio |
| **IA Premium** | Claude Opus 4.6 | Fallback vía API |

### Plane: Estados de Issues

| Estado | UUID | Tipo |
|--------|------|------|
| Backlog | `d5ba1fc8-8502-404b-a437-92469a63a5d3` | backlog |
| Todo | `2dfafad4-590c-43eb-8480-e56a2e09db17` | unstarted |
| In Progress | `f4397648-02c5-463f-b113-468943c84bfc` | started |
| Done | `19806a67-b62f-43b5-b860-7bf4a19e2ce2` | completed |
| Cancelled | `fd2182dd-978f-46eb-883d-cc717606b266` | cancelled |

### Plane: Labels del Proyecto S-LABS

| Label | Color | Uso |
|-------|-------|-----|
| desarrollo | 🔵 #2563EB | Código, features, bugs |
| soporte | 🟢 #16A34A | Tickets de soporte, clientes |
| admin | 🟡 #EAB308 | Tareas administrativas |
| infra | 🟠 #EA580C | Servidores, despliegues, VPS |
| docs | 🟣 #9333EA | Documentación, guías |
| urgente | 🔴 #DC2626 | Prioridad crítica |

---

## 📝 Notas y Decisiones

### 2026-04-16 — Pipeline Plane→Teams + Organización equipo

**Pipeline Plane→Teams (Operaciones)**:
1. Workflow n8n `Plane a Teams (Operaciones)` creado y publicado
2. Webhook nativo registrado en Plane (Settings > Webhooks, solo Work Items)
3. Nodo IF v2.3 filtra solo `state.group === "completed"` (tareas Done)
4. Mensaje dinámico: SLABS-XX + nombre + estado + prioridad
5. Canal destino: #tareas (ORDEN)
6. Verificado end-to-end: test positivo (Done→notifica) y negativo (Todo→no notifica)
7. API key n8n generada (`Ecosystem Bridge`) y guardada en `.env`
8. Issues de test: SLABS-15 a SLABS-21 (borrar cuando convenga)

**Fase 1c: Organización del equipo**:
1. Timezone del proyecto → `Europe/Madrid`
2. Descripción del proyecto actualizada (eliminada la demo genérica)
3. Labels de demo eliminados (`concepts`, `admin` viejo)
4. 6 labels nuevos creados: desarrollo, soporte, admin, infra, docs, urgente
5. Issues de test eliminados (SLABS-8, SLABS-9)
6. Invitación reenviada a Gabriel (`gabriel@strategialabs.eu`, rol Admin)
7. UUIDs de todos los estados documentados

**Decisiones clave**:
- Estructura **multi-proyecto** en Plane (un proyecto por iniciativa, no monolítico)
- S-LABS como proyecto central de operaciones del equipo
- ORDEN (Teams) como centro de mando con canales por iniciativa
- Cristian y Nayara se invitarán cuando sea relevante
- Timezone del workspace requiere cambio manual (API no permite con API key)
- n8n: PATCH actualiza borrador, publicar requiere POST `/activate` con `versionId`
- Emojis Unicode no funcionan en HTML de Teams (encoding se pierde)

### 2026-04-15 — Integración completa Bloque 0-3

**Sesión maratoniana**: Se completaron los 4 bloques del plan original en una sola sesión.

1. **Bloque 0 (Limpieza)**: Auditoría completa, CONTEXT.md reescrito, credenciales documentadas.
2. **Bloque 1 (GitHub↔Plane)**: Repo creado, GitHub Action configurada, n8n workflow desplegado. Pipeline PR→Plane verificado con múltiples PRs de test.
3. **Bloque 2 (M365)**: Azure App con permisos Delegated + Application, credencial OAuth2 Teams en n8n, equipo ORDEN creado con canales #dev y #tareas. Notificaciones verificadas end-to-end.
4. **Bloque 3 (MCP)**: Plane MCP Server oficial (Python/uvx) configurado en Antigravity. Pendiente reinicio para activar.

**Decisiones clave**:
- Webhooks via GitHub Actions (no Plane webhooks) por limitaciones de Plane CE.
- Filtrado por `sequence_id` exacto (no fuzzy) en búsquedas de Plane API.
- HTML enriquecido para mensajes de Teams (emojis + links).
- Equipo ORDEN como hub central de Teams para automatizaciones.

### 2026-04-13
- **Cambio de Infraestructura**: Migración de Synology (local) a **VPS propio** para facilitar accesibilidad externa.

---

## 🚀 Próximos Pasos

1. **Limpiar issues de test** en Plane (SLABS-15 a SLABS-21)
2. **Actualizar webhook n8n** `github-to-plane` para apuntar a `slabs-studio/organizador-tareas`
3. **Actualizar GitHub Action** en el repo de la org
4. **Guía de usuario**: Documentación para el equipo sobre cómo usar el sistema
5. **Crear canales en Teams (ORDEN)** por cada iniciativa/proyecto
6. **Migrar Passbolt** del servidor Contabo a infraestructura centralizada
7. **Consolidar VPS y dominios** dispersos
8. **OneDrive**: Automatización de carpetas por proyecto (workflow n8n)
9. **Cambiar timezone workspace** a Europe/Madrid (manual)

---

## 💡 Cómo usar este archivo

**Al iniciar cada sesión:**
> `/inicio` — Lee CONTEXT.md y muestra resumen

**Al terminar cada sesión:**
> `/fin` — Actualiza checklists y sección de Notas
