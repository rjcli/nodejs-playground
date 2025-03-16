const http = require('http');
const fs = require('fs');

const data = fs.readFileSync('./db/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(
  './templates/template-overview.html',
  'utf-8',
);
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync(
  './templates/template-product.html',
  'utf-8',
);

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = temp.replace(/{%ID%}/g, product.id);
  output = temp.replace(/{%IMAGE%}/g, product.image);
  output = temp.replace(/{%PRICE%}/g, product.price);
  output = temp.replace(/{%FROM%}/g, product.from);
  output = temp.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = temp.replace(/{%QUANTITY%}/g, product.quantity);
  output = temp.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
  if (!product.organic)
    output = temp.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;
};

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);
  } else if (pathName === '/api') {
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
