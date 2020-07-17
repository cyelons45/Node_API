const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
var jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
// const APIFeatures = require('../utils/APIFeatures');
const factory = require('../controllers/handlerFactory');
var multer = require('multer');
const sharp = require('sharp');
var storage = multer.memoryStorage();

const multerFileFilter = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    // You can always pass an error if something goes wrong:
    cb(new AppError('Not an image, Please upload only images.', 400), false);
  }
};
var upload = multer({storage: storage, fileFilter: multerFileFilter});
exports.uploadUserPhoto = upload.single('photo');

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpg`;
  await sharp(req.file.buffer)
    .resize(320, 240)
    .toFormat('jpeg')
    .jpeg({quality: 90})
    .toFile(`public/img/users/${req.file.filename}`, (err, info) => {
      if (err)
        return next(
          new AppError('Your image could not be saved. Please try again!')
        );
      console.log('file stored successfully');
    });
  next();
});
const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};
  allowedFields.forEach((el) => {
    if (Object.keys(obj).includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }
  const filteredBody = filteredObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;
  const user = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, {active: false});
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
