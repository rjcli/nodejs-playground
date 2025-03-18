const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
  res.end('Hello from the server...');
});

// The '127.0.0.1' is the loopback address or, localhost. This is optional here.
server.listen(8000, '127.0.0.1', () => {
  console.log('Server is listening for requests on port 8000...');
});
