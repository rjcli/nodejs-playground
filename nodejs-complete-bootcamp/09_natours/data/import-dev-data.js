const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Tour = require('../models/tourModel');

dotenv.config({ path: '../config.env' });

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

const tours = JSON.parse(fs.readFileSync('./db/tours-simple.json', 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  global.process.exit(1);
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  global.process.exit(1);
};

if (global.process.argv[2] === '--import') {
  importData();
} else if (global.process.argv[2] === '--delete') {
  deleteData();
}

console.log(global.process.argv);
