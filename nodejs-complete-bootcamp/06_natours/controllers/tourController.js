const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('./data/db/tours-simple.json'));

exports.checkID = (req, res, next, val) => {
  console.log(`Tour ID is ${val}`);
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      // tours: tours,
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  // Approach 01: Find tours only if ID is within [0, tours.length]
  // This is taking place with param middleware.

  // Approach 02: Find tours and check whether it exits or not
  const tour = tours.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile('./data/db/tours-simple.json', JSON.stringify(tours), (err) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to create the tour',
      });
    }
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
