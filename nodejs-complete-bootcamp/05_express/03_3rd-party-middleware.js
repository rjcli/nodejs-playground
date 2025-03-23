const express = require('express');
const morgan = require('morgan');

const app = express();

// 3rd-party middleware
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.end('Hello from the server...');
});

app.get('/overview', (req, res) => {
  res.end('Hello from the overview route...');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}...`);
});
