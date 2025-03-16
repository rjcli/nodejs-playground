const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('<h1>This is the OVERVIEW route...</h1>');
  } else if (pathName === '/product') {
    res.end('<h1>This is the PRODUCT route...</h1>');
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found...</h1>');
  }
});

server.listen(8000, () => {
  console.log('Server is listening for requests on 8000...');
});
