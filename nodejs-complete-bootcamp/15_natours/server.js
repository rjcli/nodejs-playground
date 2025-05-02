const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

// Uncaught Exception
global.process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception! Shutting down...');
  global.process.exit(1);
});

const app = require('./app');

// const mongodb_atlas_uri = global.process.env.DATABASE.replace(
//   '<PASSWORD>',
//   global.process.env.DATABASE_PASSWORD,
// ).replace('<DATABASE_NAME>', global.process.env.DATABASE_NAME);

const mongodb_localhost_uri = global.process.env.DATABASE_LOCAL.replace(
  '<DATABASE_NAME>',
  global.process.env.DATABASE_NAME,
);

mongoose
  .connect(mongodb_localhost_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('The database connection established!');
  });

const PORT = global.process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}.`);
});

// Unhandled Rejection
global.process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection! Shutting down...');
  server.close(() => {
    global.process.exit(1);
  });
});
