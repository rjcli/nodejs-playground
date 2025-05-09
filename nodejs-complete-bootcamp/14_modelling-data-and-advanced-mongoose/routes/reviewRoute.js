const express = require('express');

const {
  getAllReviews,
  createReview,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

// This is needed for nested routes.
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

module.exports = router;
