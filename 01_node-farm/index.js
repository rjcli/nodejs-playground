const http = require('http');
const fs = require('fs');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./models/replaceTemplate');

const data = fs.readFileSync('./db/data.json', 'utf-8');
const dataObj = JSON.parse(data);

// Just using slugify, not getting used in the routing of the application
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const tempOverview = fs.readFileSync(
  './templates/template-overview.html',
  'utf-8',
);
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync(
  './templates/template-product.html',
  'utf-8',
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/products') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.end('Page not found...');
  }
});

server.listen(8000, () => {
  console.log('Server is listening for requests on port 8000...');
});
