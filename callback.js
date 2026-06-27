const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/callback', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  console.log('=== Payment Callback Diterima ===');
  console.log('IP Pengirim:', ip);
  console.log('Body:', req.body);

  const logEntry = {
    timestamp: new Date().toISOString(),
    ip,
    body: req.body
  };
  fs.appendFileSync('payment_log.txt', JSON.stringify(logEntry) + '\n');

  res.status(200).json({ status: 'received' });
});

app.get('/', (req, res) => {
  res.send('Payment Callback Server Aktif!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
