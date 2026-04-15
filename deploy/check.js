const { Client } = require('ssh2');

const username = 'ubuntu';
const password = 'Strategia.Labs-2026';
const host = '51.77.202.96';

const conn = new Client();
conn.on('ready', () => {
  conn.exec(`cat /opt/ecosystem/plane/docker-compose.yml | grep -A 20 proxy:`, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => conn.end()).on('data', (d) => process.stdout.write(d)).stderr.on('data', (d) => process.stderr.write(d));
  });
}).connect({ host, port: 22, username, password });
