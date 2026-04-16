# 📋 Flujo de Gestión de Proyectos — Strategia Labs

> **Versión**: 1.0  
> **Fecha**: 16 de abril de 2026  
> **Equipo**: Gabi, David, Cristian, Nayara

---

## 🎯 Visión General

Cada iniciativa que nace en Strategia Labs sigue un flujo estructurado que conecta la planificación local con Plane (gestor de tareas), GitHub (código) y Teams (comunicación).

**El principio fundamental**: todo proyecto empieza como un documento aquí, se divide en hitos con fechas, se empuja a Plane como issues rastreables, y se cierra cuando todos los hitos están completados.

```
┌─────────────┐    ┌──────────────┐    ┌───────────┐    ┌──────────┐
│  1. IDEA    │ →  │  2. PLAN     │ →  │ 3. PLANE  │ →  │ 4. HACER │
│  (Concepto) │    │  (Documento) │    │ (Issues)  │    │(Ejecutar)│
└─────────────┘    └──────────────┘    └───────────┘    └──────────┘
                                                              │
┌─────────────┐    ┌──────────────┐    ┌───────────┐          │
│  7. CERRAR  │ ←  │ 6. VERIFICAR │ ←  │ 5. MARCAR │ ←───────┘
│  (Archivar) │    │  (Revisar)   │    │(Progreso) │
└─────────────┘    └──────────────┘    └───────────┘
```

---

## 📖 Las 7 Fases

### Fase 1: IDEA — Nace la iniciativa

Cualquier miembro del equipo propone una iniciativa. Puede ser:
- Una migración (email, Passbolt, VPS...)
- Un proyecto nuevo (web, app, producto...)
- Una mejora operativa (automatización, optimización...)

**Resultado**: Una frase clara que describe qué se quiere conseguir.

**Ejemplo**:  
> *"Migrar el dominio de email de @strategialabs.eu a @slabs.studio"*

---

### Fase 2: PLAN — Se documenta y estructura

El agente (Antigravity) crea un **plan de implementación** con toda la información necesaria para ejecutar el proyecto.

#### Archivo: `proyectos/{nombre-proyecto}/plan.md`

Cada proyecto tiene su propia carpeta con esta estructura:

```
proyectos/
├── migrar-email-slabs/
│   ├── plan.md              ← Plan detallado
│   ├── task.md              ← Checklist de seguimiento
│   └── notas/               ← Capturas, docs auxiliares
├── migrar-passbolt/
│   ├── plan.md
│   ├── task.md
│   └── notas/
└── consolidar-vps/
    ├── plan.md
    ├── task.md
    └── notas/
```

#### Contenido del `plan.md`:

```markdown
# [Nombre del Proyecto]

## Resumen
Qué se va a hacer y por qué.

## Datos del Proyecto
| Campo              | Valor                          |
|--------------------|--------------------------------|
| Responsable        | Gabi / David / Ambos           |
| Fecha de inicio    | YYYY-MM-DD                     |
| Fecha objetivo     | YYYY-MM-DD                     |
| Prioridad          | 🔴 Alta / 🟡 Media / 🟢 Baja |
| Label Plane        | infra / desarrollo / admin...  |
| Canal Teams        | #nombre-canal (en ORDEN)       |
| Proyecto Plane     | S-LABS (o nuevo proyecto)      |

## Hitos

### Hito 1: [Nombre] — Fecha: YYYY-MM-DD
- Descripción de lo que se consigue al completar este hito
- Lista de tareas necesarias

### Hito 2: [Nombre] — Fecha: YYYY-MM-DD
- ...

## Riesgos y Dependencias
- Qué puede salir mal
- De qué depende (accesos, terceros, etc.)

## Criterio de Éxito
- Cómo sabemos que está terminado
```

**Revisión**: El plan se presenta al responsable para aprobación antes de ejecutar.

---

### Fase 3: PLANE — Se crean los issues

Una vez aprobado el plan, el agente crea **un issue por hito** en Plane:

| Campo Issue       | Valor                                          |
|-------------------|-------------------------------------------------|
| **Título**        | `[Proyecto] Hito X: Nombre del hito`           |
| **Descripción**   | Detalle del hito con checklist de subtareas     |
| **Estado**        | `Backlog` (al crear) → `In Progress` → `Done`  |
| **Label**         | Según el tipo (infra, desarrollo, admin...)     |
| **Prioridad**     | urgent / high / medium / low / none             |
| **Asignado a**    | Responsable del hito                            |
| **Fecha límite**  | La fecha del hito                               |

#### Ejemplo para "Migrar email a @slabs.studio":

```
SLABS-10: [Email] Hito 1: Agregar dominio en M365     → Fecha: 17/04
SLABS-11: [Email] Hito 2: Configurar DNS Cloudflare   → Fecha: 17/04
SLABS-12: [Email] Hito 3: Crear alias para el equipo  → Fecha: 18/04
SLABS-13: [Email] Hito 4: Verificar envío/recepción   → Fecha: 18/04
```

**Automatización**: Al crear issues, se notifica automáticamente en Teams (#dev / ORDEN).

---

### Fase 4: HACER — Se ejecuta el trabajo

El equipo trabaja en los hitos. Durante la ejecución:

- **El agente** puede ejecutar tareas técnicas (APIs, configs, código)
- **El equipo** hace las tareas manuales (accesos web, verificaciones)
- **Cada sesión** actualiza el `task.md` local con el progreso

#### Archivo: `task.md`

```markdown
# Migrar Email a @slabs.studio — Progreso

- [x] Hito 1: Agregar dominio en M365
  - [x] Acceder a admin.microsoft.com
  - [x] Agregar slabs.studio como dominio
  - [x] Obtener código TXT de verificación
- [/] Hito 2: Configurar DNS Cloudflare
  - [x] Añadir TXT de verificación
  - [ ] Cambiar MX records
  - [ ] Actualizar SPF
  - [ ] Añadir DKIM
- [ ] Hito 3: Crear alias para el equipo
- [ ] Hito 4: Verificar envío/recepción
```

Leyenda:
- `[ ]` = Pendiente
- `[/]` = En progreso
- `[x]` = Completado

---

### Fase 5: MARCAR — Se actualiza el progreso

Cuando un hito se completa:

1. **`task.md`**: Se marca como `[x]`
2. **Plane**: El issue pasa a estado `Done` (vía API automáticamente)
3. **Teams**: Se notifica al canal correspondiente
4. **CONTEXT.md**: Se documenta si es un cambio relevante del ecosistema

```
task.md [x] ──→ Plane (Done) ──→ Teams (notificación)
```

**Esto es bidireccional**: si alguien cierra un issue en Plane manualmente, se puede reflejar aquí también.

---

### Fase 6: VERIFICAR — Se revisa que todo funciona

Antes de cerrar el proyecto:

- **Tests funcionales**: ¿funciona lo que se ha implementado?
- **Documentación**: ¿está actualizado CONTEXT.md?
- **Equipo**: ¿todos tienen acceso/saben usar lo nuevo?

El agente puede ejecutar verificaciones automatizadas (APIs, DNS checks, etc.).

---

### Fase 7: CERRAR — Se archiva el proyecto

Cuando todos los hitos están en `Done`:

1. **Plane**: Todos los issues del proyecto en estado `Done`
2. **task.md**: Todo marcado como `[x]`
3. **CONTEXT.md**: Actualizado con el resultado final
4. **Carpeta del proyecto**: Se mantiene como referencia histórica

---

## 🔗 Conexiones del Ecosistema

```
                    ┌─────────────────┐
                    │   ANTIGRAVITY   │
                    │  (Agente IA)    │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼──────┐ ┌────▼────┐ ┌───────▼──────┐
     │    PLANE      │ │ GITHUB  │ │    TEAMS     │
     │  (Tareas)     │ │ (Código)│ │ (Comunic.)   │
     │               │ │         │ │              │
     │ • Issues      │ │ • PRs   │ │ • #dev       │
     │ • Estados     │ │ • Code  │ │ • #tareas    │
     │ • Fechas      │ │ • CI/CD │ │ • ORDEN      │
     └───────────────┘ └─────────┘ └──────────────┘
              │              │              │
              └──────────────┼──────────────┘
                             │
                    ┌────────▼────────┐
                    │      n8n        │
                    │ (Automatización)│
                    │                 │
                    │ GitHub → Plane  │
                    │ Plane → Teams   │
                    └─────────────────┘
```

### ¿Qué se automatiza?

| Evento | Acción automática |
|--------|-------------------|
| PR en GitHub | → Issue en Plane se mueve a `In Progress` |
| PR mergeado | → Issue en Plane se mueve a `Done` |
| Issue cambia estado en Plane | → Notificación en Teams |
| Agente completa hito | → Actualiza Plane + Teams + task.md |

---

## 📝 Ejemplo Completo: Migrar Email

### 1. IDEA
> Migrar el dominio de email de @strategialabs.eu a @slabs.studio

### 2. PLAN
Se crea `proyectos/migrar-email-slabs/plan.md` con 4 hitos y fecha objetivo.

### 3. PLANE
Se crean SLABS-10 a SLABS-13, cada uno con su fecha y responsable.

### 4. HACER
Gabi abre M365 Admin, el agente configura DNS, se prueban los alias.

### 5. MARCAR
Cada hito completado → task.md `[x]` + Plane `Done` + Teams notificación.

### 6. VERIFICAR
Se envía un email de prueba a gabi@slabs.studio y se confirma recepción.

### 7. CERRAR
Todos los SLABS-10 a 13 en Done. CONTEXT.md actualizado. Proyecto cerrado.

---

## ⚡ Comandos Rápidos

| Acción | Cómo |
|--------|------|
| Iniciar proyecto | *"Crea un proyecto para [nombre]"* |
| Ver progreso | *"¿Cómo va el proyecto [nombre]?"* o `/tareas` |
| Marcar hito | *"Marca el hito 2 de [proyecto] como completado"* |
| Crear issue en Plane | Se hace automáticamente al aprobar el plan |
| Ver roadmap completo | `/mapa` |

---

## 📁 Estructura de Archivos

```
organizador-tareas/
├── CONTEXT.md                    ← Estado general del ecosistema
├── FLUJO_PROYECTOS.md            ← Este documento (metodología)
├── TEAM_ONBOARDING.md            ← Guía de incorporación
├── proyectos/                    ← Carpeta de proyectos activos
│   ├── migrar-email-slabs/
│   │   ├── plan.md
│   │   └── task.md
│   ├── migrar-passbolt/
│   │   ├── plan.md
│   │   └── task.md
│   └── consolidar-vps/
│       ├── plan.md
│       └── task.md
└── .github/
    └── workflows/
        └── plane-sync.yml       ← GitHub Action
```

---

> **Nota**: Este flujo es flexible. Para tareas pequeñas y urgentes se puede crear un issue directo en Plane sin necesidad de plan completo. El flujo de 7 fases es para iniciativas que requieren planificación estructurada.
