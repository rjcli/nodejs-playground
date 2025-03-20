const EventEmitter = require('events');

// Either you can create an object from EventEmitter directly
const myEmitter = new EventEmitter();

// Or, you can extend EventEmitter to create a new class then instantiate the new class
// class Sales extends EventEmitter {
//   constructor() {
//     super();
//   }
// }

// const myEmitter = new Sales();

myEmitter.on('newSale', () => {
  console.log('There was a new sale!');
});

myEmitter.on('newSale', () => {
  console.log('Customer name: Rashmi Raj');
});

myEmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit('newSale', 9);
