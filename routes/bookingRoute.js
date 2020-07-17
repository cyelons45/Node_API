var express = require('express');
var router = express.Router();
var bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

router.use(authController.protect);
router
  .route('/checkout-session/:tourId')
  .get(bookingController.getCheckoutSession);
router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);
router
  .route('/:id')
  .get(bookingController.getBooking)
  .delete(bookingController.updateBooking)
  .patch(bookingController.deleteBooking);
module.exports = router;
