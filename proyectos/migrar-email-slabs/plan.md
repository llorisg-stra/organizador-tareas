# Migrar Dominio Email a @slabs.studio

## Resumen

Agregar `slabs.studio` como dominio personalizado en Microsoft 365, configurar los registros DNS en Cloudflare, y crear alias de email para todo el equipo. Los emails `@strategialabs.eu` siguen funcionando en paralelo.

## Datos del Proyecto

| Campo              | Valor                                     |
|--------------------|-------------------------------------------|
| Responsable        | Gabi                                      |
| Fecha de inicio    | 2026-04-16                                |
| Fecha objetivo     | 2026-04-18                                |
| Prioridad          | 🔴 Alta                                  |
| Label Plane        | `infra`                                   |
| Canal Teams        | ORDEN / #dev                              |
| Proyecto Plane     | S-LABS                                    |
| Issue principal    | SLABS-10                                  |

## Estado Actual del DNS (slabs.studio)

| Registro | Valor actual           | Problema                        |
|----------|------------------------|----------------------------------|
| MX       | `smtp.google.com`      | ⚠️ Apunta a Google, no a M365  |
| SPF      | `include:mx.ovh.com`   | ⚠️ Apunta a OVH, no a M365    |
| A        | Cloudflare (proxy)     | ✅ OK                           |
| TXT      | Google verification    | Necesita TXT de M365            |

**DNS gestionado en**: Cloudflare

## Hitos

### Hito 1: Agregar dominio en M365 Admin — Fecha: 16/04/2026

- [ ] Acceder a [admin.microsoft.com](https://admin.microsoft.com/#/Domains)
- [ ] Ir a Configuración → Dominios → Agregar dominio
- [ ] Escribir `slabs.studio`
- [ ] Anotar el código TXT de verificación (MS=msXXXXXXXX)

**Responsable**: Gabi  
**Duración estimada**: 5 minutos

---

### Hito 2: Verificar dominio en Cloudflare — Fecha: 16/04/2026

- [ ] Acceder al panel DNS de `slabs.studio` en Cloudflare
- [ ] Añadir registro TXT: `@` → `MS=msXXXXXXXX` (el código del Hito 1)
- [ ] Volver a M365 y pulsar "Verificar"
- [ ] Confirmar que el dominio queda verificado ✅

**Responsable**: Gabi  
**Duración estimada**: 10 minutos (propagación DNS puede ser instantánea con Cloudflare)

---

### Hito 3: Configurar registros de email — Fecha: 17/04/2026

En Cloudflare, actualizar los registros DNS para que el email funcione con M365:

- [ ] **MX**: Eliminar `smtp.google.com` → Añadir `slabs-studio.mail.protection.outlook.com` (prioridad 0)
- [ ] **SPF**: Cambiar `v=spf1 include:mx.ovh.com -all` → `v=spf1 include:spf.protection.outlook.com -all`
- [ ] **CNAME autodiscover**: `autodiscover.slabs.studio` → `autodiscover.outlook.com`
- [ ] **DKIM** (2 registros CNAME): Los proporciona M365 en la configuración del dominio
- [ ] **DMARC TXT** (opcional): `_dmarc.slabs.studio` → `v=DMARC1; p=quarantine; rua=mailto:gabi@slabs.studio`

**Responsable**: Gabi (con guía del agente)  
**Duración estimada**: 15 minutos

> ⚠️ **IMPORTANTE**: Al cambiar el MX de Google a M365, cualquier email que llegue a @slabs.studio irá a Outlook en vez de Gmail. Asegurarse de que esto es lo deseado.

---

### Hito 4: Crear alias para el equipo — Fecha: 17/04/2026

En M365 Admin Center, crear alias de email para cada usuario:

- [ ] `gabi@slabs.studio` → alias de `gabriel@strategialabs.eu`
- [ ] `david@slabs.studio` → alias de `david@strategialabs.eu`
- [ ] `cristian@slabs.studio` → alias de `cristian@strategialabs.eu` (cuando aplique)
- [ ] `nayara@slabs.studio` → alias de `nayara@strategialabs.eu` (cuando aplique)
- [ ] `info@slabs.studio` → buzón compartido o alias (opcional)

**Responsable**: Gabi  
**Duración estimada**: 10 minutos

---

### Hito 5: Verificar y validar — Fecha: 18/04/2026

- [ ] Enviar email externo a `gabi@slabs.studio` → confirmar recepción en Outlook
- [ ] Enviar email desde Outlook usando `gabi@slabs.studio` como remitente
- [ ] Verificar que `gabriel@strategialabs.eu` sigue recibiendo emails también
- [ ] Test con David: enviar a `david@slabs.studio`
- [ ] Actualizar firmas de email del equipo (opcional)
- [ ] Actualizar email de contacto en GitHub org si se desea

**Responsable**: Gabi + David  
**Duración estimada**: 15 minutos

## Riesgos y Dependencias

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Cambiar MX corta el email de Google | 🔴 Alto | Los @strategialabs.eu (M365) no se tocan. Solo afecta @slabs.studio |
| Propagación DNS lenta | 🟡 Medio | Cloudflare propaga casi instantáneamente |
| DKIM mal configurado → emails van a spam | 🟡 Medio | Configurar DKIM desde M365 Admin (da los CNAME exactos) |

**Dependencias**:
- Acceso a M365 Admin Center ✅
- Acceso a Cloudflare (DNS de slabs.studio) ✅
- Licencias M365 Business activas ✅

## Criterio de Éxito

1. ✅ Email enviado a `gabi@slabs.studio` llega a Outlook
2. ✅ Email enviado desde Outlook con remitente `gabi@slabs.studio` se entrega correctamente
3. ✅ `gabriel@strategialabs.eu` sigue funcionando como antes
4. ✅ Sin emails rebotados ni marcados como spam
