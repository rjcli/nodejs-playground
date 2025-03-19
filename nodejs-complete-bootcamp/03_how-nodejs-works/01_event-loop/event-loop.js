const fs = require('fs');

// setTimeout
setTimeout(() => {
  console.log('Timer 1 finished');
}, 0);

// setImmediate
global.setImmediate(() => {
  console.log('Immediate 1 finished');
});

// I/O
fs.readFile('./test-file.txt', () => {
  console.log('I/O finished');
  console.log('--------------------------');

  setTimeout(() => {
    console.log('Timer 2 finished');
  }, 0);

  setTimeout(() => {
    console.log('Timer 3 finished');
  }, 3000);

  global.setImmediate(() => {
    console.log('Immediate 2 finished');
  });

  global.process.nextTick(() => {
    console.log('Process.nextTick');
  });
});

// Top-level code
console.log('Hello from the top-level code');
