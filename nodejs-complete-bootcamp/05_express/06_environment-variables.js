const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Make sure to configure dotenv before initialization of express.
dotenv.config({ path: './config.env' });

const app = express();

// Provided by Express
console.log(app.get('env'));

// Provided by NodeJS
console.log(global.process.env);

if (global.process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = global.process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}...`);
});
