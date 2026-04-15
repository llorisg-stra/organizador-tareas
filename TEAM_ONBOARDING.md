# 🚀 Bienvenidos al Ecosystem Bridge (Plane + IA)

Hola equipo. Hemos configurado una integración para que vuestro **Antigravity** (IA) pueda crear y gestionar tareas en nuestro servidor de Plane de forma automática. 

Para empezar a usarlo, solo necesitáis seguir estos **3 pasos rápidos**:

---

## 1. Consigue tu Llave de Plane (API Key)
1. Entra en [https://tareas.slabs.studio](https://tareas.slabs.studio).
2. Haz clic en tu perfil (esquina inferior izquierda o superior derecha).
3. Ve a **Settings** -> **API Keys**.
4. Pulsa en **"Generate New Key"**, ponle un nombre (ej: "Mi IA") y copia el código que empiece por `plane_api_...`.

## 2. Configura tu Identidad Local
En esta carpeta del proyecto donde estás trabajando:
1. Ve a la carpeta `utils/`.
2. Crea un nuevo archivo llamado `.env.bridge` (ojo al punto inicial).
3. Dentro del archivo, pega lo siguiente y guarda:
   `PLANE_API_KEY=púlsalo_aquí_tu_llave_copiada`

## 3. ¡Habla con la IA!
Ya puedes pedirle cosas a tu Antigravity como:
- *"Antigravity, crea una tarea para revisar el sprint de mañana."*
- *"Añade a Plane que tengo que llamar al cliente."*

### 💡 ¿Cómo funciona?
La IA usará el script `utils/bridge.js` para enviar la orden a nuestro servidor central de **n8n**. n8n leerá tu llave y pondrá la tarea en Plane **a tu nombre**, para que sepamos quién ha creado cada cosa.

---
*Para cualquier duda técnica, consulta con David.*
