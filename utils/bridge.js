/**
 * SLABS Ecosystem Bridge - AI Gateway Client (V2 Multi-User)
 * Este script lee la llave personal del usuario de un archivo local
 * para que n8n pueda atribuir las acciones correctamente en Plane.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuración Centralizada
const BRIDGE_URL = 'https://tareasn8n.slabs.studio/webhook/bridge-gateway';
const BRIDGE_TOKEN = 'SLABS-BRIDGE-2026-X';
const ENV_FILE = path.join(__dirname, '.env.bridge');

// Intento de leer la clave personal
let USER_KEY = '';
if (fs.existsSync(ENV_FILE)) {
    const envContent = fs.readFileSync(ENV_FILE, 'utf8');
    const match = envContent.match(/PLANE_API_KEY=(.*)/);
    if (match) USER_KEY = match[1].trim();
}

async function sendToBridge(payload) {
    if (!USER_KEY) {
        throw new Error('No se encontró tu clave personal. Crea el archivo utils/.env.bridge con: PLANE_API_KEY=tu_llave');
    }

    return new Promise((resolve, reject) => {
        const url = new URL(BRIDGE_URL);
        const options = {
            hostname: url.hostname,
            path: url.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-bridge-token': BRIDGE_TOKEN,
                'x-user-key': USER_KEY // LA LLAVE QUE IDENTIFICA AL USUARIO
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`Error del Puente (${res.statusCode}): ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.write(JSON.stringify(payload));
        req.end();
    });
}

// Lógica de CLI
const [,, command, ...args] = process.argv;
const params = {};
args.forEach((arg, i) => { if (arg.startsWith('--')) params[arg.slice(2)] = args[i + 1]; });

if (command === 'create-task') {
    const payload = {
        action: 'create_task',
        workspace: params.workspace || 's-labs',
        project: params.project || 'S-LABS',
        name: params.name || 'Nueva tarea',
        description: params.desc || 'Creado vía Bridge'
    };

    console.log('🚀 [Bridge V2] Enviando tarea personalizada al servidor central...');
    sendToBridge(payload)
        .then(res => {
            console.log('✅ ¡Atribución confirmada! Tarea creada con éxito.');
            console.log(JSON.stringify(res, null, 2));
        })
        .catch(err => {
            console.error('❌ Error:', err.message);
            process.exit(1);
        });
} else {
    console.log('Uso: node bridge.js create-task --name "Titulo" --desc "Descripcion"');
}
