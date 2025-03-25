const express = require('express');
const mongoose = require('mongoose');

const Tour = require('./models/tourModel');

const app = express();

const mongodb_localhost_uri = global.process.env.DATABASE_LOCAL;

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

const testTour = new Tour({
  name: 'The Park Camper',
  rating: 4.7,
  price: 497,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err));

const PORT = global.process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}.`);
});
