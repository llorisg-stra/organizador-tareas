const { Client } = require('ssh2');
const fs = require('fs');

const username = 'ubuntu';
const password = 'Strategia.Labs-2026';
const host = '51.77.202.96';
const scriptContent = fs.readFileSync('vps-setup.sh', 'utf8');

console.log(`Conectando con el usuario: ${username}...`);

const conn = new Client();

conn.on('ready', () => {
  console.log(`✅ ¡Conectado con éxito!`);
  console.log('Iniciando despliegue seguro (pasando script por STDIN)...');
  
  // Ejecutamos sudo bash. Es posible que pida contraseña para sudo, pero "ubuntu" en OVH suele tener NOPASSWD o requiere contraseña. Si requiere contraseña de sudo, le pasaremos -S.
  // Pero lo más limpio es usar sudo -S para asegurarnos
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
    
    // Le pasamos la contraseña para el prompt de sudo (por si acaso pide)
    stream.write(password + '\n');
    // Le pasamos el contenido del script
    stream.write(scriptContent);
    // Y un exit para que termine el bash
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
