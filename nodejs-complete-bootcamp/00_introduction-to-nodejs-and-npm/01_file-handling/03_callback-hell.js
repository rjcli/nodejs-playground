const fs = require('fs');

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) {
    console.log(err);
  }
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    if (err) {
      console.log(err);
    }
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      if (err) {
        console.log(err);
      }
      console.log(data3);
    });
    console.log(data2);
  });
});

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) {
    console.log(err);
  }
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    if (err) {
      console.log(err);
    }
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      if (err) {
        console.log(err);
      }
      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
        if (err) {
          console.log(err);
        }
        console.log('Your file has been written');
      });
      console.log(data3);
    });
    console.log(data2);
  });
});
