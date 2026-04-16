# Migrar Email a @slabs.studio — Progreso

> Proyecto: migrar-email-slabs  
> Inicio: 2026-04-16  
> Fecha objetivo: 2026-04-18  
> Issues Plane: SLABS-10 a SLABS-14

---

- [x] **Hito 1**: Agregar dominio en M365 Admin (SLABS-10)
  - [x] Acceder a admin.microsoft.com
  - [x] Agregar slabs.studio como dominio
  - [x] Anotar código TXT de verificación

- [x] **Hito 2**: Verificar dominio en Cloudflare (SLABS-11)
  - [x] Añadir TXT de verificación en Cloudflare
  - [x] Verificar en M365

- [x] **Hito 3**: Configurar registros de email (SLABS-12)
  - [x] Cambiar MX → M365
  - [x] Actualizar SPF
  - [x] Añadir autodiscover CNAME
  - [x] Configurar DKIM
  - [x] Añadir DMARC (opcional)

- [x] **Hito 4**: Crear alias para el equipo (SLABS-13)
  - [x] gabi@slabs.studio
  - [x] david@slabs.studio
  - [x] cristian@slabs.studio (cuando aplique)
  - [x] nayara@slabs.studio (cuando aplique)

- [x] **Hito 5**: Verificar y validar (SLABS-14)
  - [x] Test recepción externa
  - [x] Test envío como @slabs.studio
  - [x] Confirmar @strategialabs.eu sigue funcionando
  - [x] Test con David
