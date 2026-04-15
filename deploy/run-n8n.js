const { Client } = require('ssh2');
const fs = require('fs');

const username = 'ubuntu';
const password = 'Strategia.Labs-2026';
const host = '51.77.202.96';
const scriptContent = fs.readFileSync('vps-n8n.sh', 'utf8');

const conn = new Client();
conn.on('ready', () => {
  conn.exec(`sudo -S bash`, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => conn.end()).on('data', (d) => process.stdout.write(d)).stderr.on('data', (d) => process.stderr.write(d));
    stream.write(password + '\n');
    stream.write(scriptContent);
    stream.write('\nexit\n');
  });
}).on('error', console.error).connect({ host, port: 22, username, password });
