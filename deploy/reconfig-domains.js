const { Client } = require('ssh2');

const username = 'ubuntu';
const password = 'Strategia.Labs-2026';
const host = '51.77.202.96';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Conectado para configuración final de n8n...');
  
  const cmd = `
# Actualizar n8n con el nombre tareasn8n
cd /opt/ecosystem/n8n
sudo sed -i 's/N8N_HOST=.*/N8N_HOST=tareasn8n.slabs.studio/' docker-compose.yml
sudo sed -i 's/N8N_PROTOCOL=.*/N8N_PROTOCOL=https/' docker-compose.yml
sudo sed -i 's/WEBHOOK_URL=.*/WEBHOOK_URL=https:\\/\\/tareasn8n.slabs.studio\\//' docker-compose.yml
sudo docker compose up -d
`;

  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => {
      console.log('Terminado con código: ' + code);
      conn.end();
    }).on('data', (d) => process.stdout.write(d)).stderr.on('data', (d) => process.stderr.write(d));
    stream.write(password + '\n');
  });
}).on('error', console.error).connect({ host, port: 22, username, password });
