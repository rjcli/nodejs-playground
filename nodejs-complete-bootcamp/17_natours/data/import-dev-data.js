const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');

dotenv.config({ path: '../config.env' });

// const mongodb_atlas_uri = global.process.env.DATABASE.replace(
//   '<PASSWORD>',
//   global.process.env.DATABASE_PASSWORD,
// ).replace('<DATABASE_NAME>', global.process.env.DATABASE_NAME);

const mongodb_localhost_uri = global.process.env.DATABASE_LOCAL.replace(
  '<DATABASE_NAME>',
  global.process.env.DATABASE_NAME,
);

console.log(mongodb_localhost_uri);

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

const tours = JSON.parse(fs.readFileSync('./db/tours.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync('./db/users.json', 'utf-8'));
const reviews = JSON.parse(fs.readFileSync('./db/reviews.json', 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);

    // Skipping validation before save and also make sure to comment
    // encryption of password in the User model because all the passawords
    // are already hashed.
    // Also the decrypted password for all the users is 'test1234'
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  global.process.exit(1);
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
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
