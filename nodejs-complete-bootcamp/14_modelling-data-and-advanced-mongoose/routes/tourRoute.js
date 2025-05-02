const express = require('express');

const {
  aliasTopTours,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
} = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require('./reviewRoute');

const router = express.Router();

// Aliasing
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);
router.route('/distances/:latlng/unit/:unit').get(getDistances);

router.route('/').get(getAllTours).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('lead-guide', 'admin'), deleteTour);

// Nested Routes
// However, since we are defining review route inside tour route.
// So, this is confusing syntax wise. So, this is not recommended.
// Use merge params feature of express.

// Ex.:
// POST tours/5c88fa8cf4afda39709c2955/reviews

// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createReview);

// Mounting the router
router.use('/:tourId/reviews', reviewRouter);

module.exports = router;
