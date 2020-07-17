const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Tour = require('../models/tourModel');
// const User = require('../models/userModel');
const Booking = require('../models/bookingModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  // console.log(tour);
  if (!tours) {
    return next(new AppError('No tour with that ID', 404));
  }
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({slug: req.params.slug}).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  // console.log(tour);
  if (!tour) {
    return next(new AppError('No tour with that ID', 404));
  }
  res.status(200).render('tour', {
    title: `${tour.name}`,
    tour,
  });
});

exports.loginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login',
  });
});

exports.settings = catchAsync(async (req, res, next) => {
  res.status(200).render('me', {
    title: 'My Account',
  });
});

exports.getReviews = catchAsync(async (req, res, next) => {
  res.status(200).render('reviews', {
    title: 'My Reviews',
  });
});
exports.bookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({user: req.user.id});
  const tourID = bookings.map((el) => el.tour._id);
  const tours = await Tour.find({_id: {$in: tourID}});
  res.status(200).render('overview', {
    title: 'My Bookings',
    tours,
  });
});
exports.billing = catchAsync(async (req, res, next) => {
  res.status(200).render('billing', {
    title: 'My Billings',
  });
});
