const express = require('express');
const morgan = require('morgan');

const app = express();

// 3rd-party middleware
app.use(morgan('dev'));

// Custom middlewares
app.use((req, res, next) => {
  console.log('Hello from the middleware 01');
  next();
});

app.get('/', (req, res) => {
  console.log(req.url);
  res.end('Hello from the server...');
});

app.use((req, res, next) => {
  console.log('Hello from the middleware 02');
  next();
});

// Middleware to add the current request time to the req object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get('/overview', (req, res) => {
  console.log(req.url);
  console.log(req.requestTime);
  res.end('Hello from the overview route...');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}...`);
});
