const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8008;

const volumePath = './data';
if (!fs.existsSync(volumePath)) {
  fs.mkdirSync(volumePath);
}

app.get('/', (req, res) => {
  const timestamp = new Date().toISOString();
  const logMessage = `GET request received at ${timestamp}`;

  fs.appendFile(`${volumePath}/logs.txt`, `${logMessage}\n`, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Log message written to file:', logMessage);
      res.send('All good');
    }
  });
});

app.get('/info', (req, res) => {
  fs.readFile(`${volumePath}/logs.txt`, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const logs = data.split('\n').filter(Boolean);
      res.json({ logs });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
