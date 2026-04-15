const { Client } = require('ssh2');

const username = 'ubuntu';
const password = 'Strategia.Labs-2026';
const host = '51.77.202.96';

const conn = new Client();
conn.on('ready', () => {
  // Paramos plane, borramos volumen de BD y arrancamos
  conn.exec(`cd /opt/ecosystem/plane && sudo docker compose down -v && sudo docker compose up -d`, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => conn.end()).on('data', (d) => process.stdout.write(d)).stderr.on('data', (d) => process.stderr.write(d));
    stream.write(password + '\n');
  });
}).connect({ host, port: 22, username, password });
