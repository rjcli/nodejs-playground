const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

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
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}.`);
});
