const express = require('express');

const {
  getOverview,
  getTour,
  getLoginForm,
  getSignupForm,
  getAccount,
  updateUserData,
  getMyTours,
  alerts,
} = require('../controllers/viewController');
const { isLoggedIn, protect } = require('../controllers/authController');

const router = express.Router();

router.use(alerts);

router.get('/', isLoggedIn, getOverview);

router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/signup', isLoggedIn, getSignupForm);
router.get('/me', protect, getAccount);

router.get('/my-tours', protect, getMyTours);

router.post('/submit-user-data', updateUserData);

module.exports = router;
