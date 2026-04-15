const { Client } = require('ssh2');

const username = 'ubuntu';
const password = 'Strategia.Labs-2026';
const host = '51.77.202.96';

const conn = new Client();
conn.on('ready', () => {
  const cmd = `cd /opt/ecosystem/plane && \
sudo sed -i 's/^WEB_URL=http:\\/\\/51.77.202.96:8000/WEB_URL=http:\\/\\/51.77.202.96/' .env && \
sudo sed -i 's/^CORS_ALLOWED_ORIGINS=http:\\/\\/51.77.202.96:8000/CORS_ALLOWED_ORIGINS=http:\\/\\/51.77.202.96/' .env && \
sudo docker compose restart api web worker beat-worker`;

  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => conn.end()).on('data', (d) => process.stdout.write(d)).stderr.on('data', (d) => process.stderr.write(d));
    stream.write(password + '\n');
  });
}).connect({ host, port: 22, username, password });
