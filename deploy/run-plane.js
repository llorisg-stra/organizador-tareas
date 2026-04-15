const { Client } = require('ssh2');
const fs = require('fs');

const username = 'ubuntu';
const password = 'Strategia.Labs-2026';
const host = '51.77.202.96';
const scriptContent = fs.readFileSync('vps-plane.sh', 'utf8');

console.log(`Conectando con el usuario: ${username}...`);

const conn = new Client();

conn.on('ready', () => {
  console.log(`✅ ¡Conectado con éxito!`);
  console.log('Iniciando despliegue de Plane (STDIN)...');
  
  conn.exec(`sudo -S bash`, (err, stream) => {
    if (err) throw err;
    
    stream.on('close', (code, signal) => {
      console.log('Ejecución terminada :: code: ' + code);
      conn.end();
    }).on('data', (data) => {
      process.stdout.write(data);
    }).stderr.on('data', (data) => {
      process.stderr.write(data);
    });
    
    stream.write(password + '\n');
    stream.write(scriptContent);
    stream.write('\nexit\n');
  });
}).on('error', (err) => {
  console.error('Error:', err);
}).connect({
  host: host,
  port: 22,
  username: username,
  password: password,
  readyTimeout: 10000
});
