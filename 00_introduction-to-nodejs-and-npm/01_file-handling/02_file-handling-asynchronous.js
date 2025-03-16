const fs = require('fs');

// Non-blocking (asynchronous) way

// Read from a file
fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});
console.log('Reading file...');

// Write into a file
let textOut = `This is what we know about the avocado.\nCreated on ${Date.now()}`;
fs.writeFile('./txt/output.txt', textOut, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Writing successful');
});

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) {
    console.log(err);
  }
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    if (err) {
      console.log(err);
    }
    console.log(data2);
  });
});

// Callback hell
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
