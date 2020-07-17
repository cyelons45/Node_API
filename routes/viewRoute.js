var express = require('express');
var router = express.Router();
var viewController = require('../controllers/viewController');
var authController = require('../controllers/authController');
var bookingController = require('../controllers/bookingController');

router.route('/login').get(authController.isLoggedIn, viewController.loginForm);
router.route('/me').get(authController.isLoggedIn, viewController.settings);
router.route('/my-tours').get(bookingController.createBookingCheckout);
router
  .route('/my-reviews')
  .get(authController.isLoggedIn, viewController.getReviews);
router
  .route('/my-billings')
  .get(authController.isLoggedIn, viewController.billing);
router.route('/my-tours').get(authController.protect, viewController.bookings);

router.route('/').get(authController.isLoggedIn, viewController.getOverview);
router.route('/tour/:slug').get(authController.protect, viewController.getTour);
module.exports = router;
