const userRouter = require('express').Router();

const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');
const { authMiddleware } = require('../../middlewares/auth');
const { getMe } = require('../../middlewares/currentUserId');
const asyncErrorHandler = require('../../middlewares/asyncErrorHandler');

userRouter.post('/signup', asyncErrorHandler(AuthController.signup));
userRouter.post('/login', asyncErrorHandler(AuthController.login));

userRouter.post(
  '/forgotPassword',
  asyncErrorHandler(AuthController.forgotPassword)
);
userRouter.patch(
  '/resetPassword/:token',
  asyncErrorHandler(AuthController.resetPassword)
);

userRouter.patch(
  '/updateMyPassword',
  authMiddleware,
  asyncErrorHandler(AuthController.updatePassword)
);

userRouter.get(
  '/me',
  authMiddleware,
  getMe,
  asyncErrorHandler(UserController.getOneUser)
);

userRouter.patch(
  '/updateMe',
  authMiddleware,
  asyncErrorHandler(UserController.updateMe)
);

userRouter.delete(
  '/deleteMe',
  authMiddleware,
  asyncErrorHandler(UserController.deleteMe)
);

userRouter.route('/').get(asyncErrorHandler(UserController.getAllUsers));

userRouter
  .route('/:id')
  .get(asyncErrorHandler(UserController.getOneUser))
  .patch(asyncErrorHandler(UserController.updateUser))
  .delete(asyncErrorHandler(UserController.deleteUser));

module.exports = userRouter;
