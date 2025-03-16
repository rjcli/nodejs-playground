const fs = require('fs');

// Blocking (synchronous) way

// Read from a file
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

// Write into a file
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');
