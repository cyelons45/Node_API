var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
var tourRouter = require('./routes/tourRoute');
var userRouter = require('./routes/userRoute');
const viewRouter = require('./routes/viewRoute');
const bookingRouter = require('./routes/bookingRoute');
const reviewRouter = require('./routes/reviewRoute');

var pug = require('pug');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/reviews', reviewRouter);
// app.all('*', (req, res, next) => {
//   console.log()
//   // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(globalErrorHandler);
// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
