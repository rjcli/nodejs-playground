const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

// Configuring the number of threads in Thread Pool size
// global.process.env.UV_THREADPOOL_SIZE = 1;

// Non-blocking (Asynchronous)
fs.readFile('../test-file.txt', () => {
  // Here, all these 4 blocks executes concurrently on 4 threads of the Thread Pool.
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
});
