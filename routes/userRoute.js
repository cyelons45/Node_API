var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);
router.route('/signup').post(authController.signup);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);
router.use(authController.protect);
router.route('/me').get(userController.getMe, userController.getUser);
router.route('/deleteMe').delete(userController.getMe, userController.deleteMe);
router
  .route('/updatepassword')
  .patch(userController.getMe, authController.updatepassword);

router
  .route('/updateMe')
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe
  );
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);
module.exports = router;
