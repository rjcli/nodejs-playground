const Review = require('../models/reviewModel');
const catchAsyncError = require('../utils/catchAsyncError');

exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  let filter = {};

  if (req.params.tourId) {
    filter = {
      tour: req.params.tourId,
    };
  }

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsyncError(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
