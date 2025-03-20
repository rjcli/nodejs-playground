// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports (like default export of import/export)
const Calculator = require('./src/calculator');
const calculator = new Calculator();

console.log(calculator.add(2, 5));

// exports (like normal export of import/export)
const { add, multiply } = require('./src/inline-exports');
console.log(add(5, 6));
console.log(multiply(5, 6));

// Caching
require('./src/basic-module')();
require('./src/basic-module')();
