const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

// Configuring the number of threads in Thread Pool size
// global.process.env.UV_THREADPOOL_SIZE = 1;

// Blocking (Synchronous)
fs.readFile('../test-file.txt', () => {
  // Here, all these 4 blocks executes one-after-another because of synchronous (blocking) nature.
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');
});
