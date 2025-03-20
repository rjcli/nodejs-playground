const fs = require('fs');

fs.writeFile('./hello.txt', 'Hello, World!', 'utf-8', (err) => {
  if (err) {
    return console.log('Write failed');
  }
  console.log('Write completed successfully');
});

console.log('Hello, World!');
