const Router = require('express');

const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');
const { authMiddleware } = require('../../middlewares/auth');
const asyncErrorHandler = require('../../middlewares/asyncErrorHandler');

const userRouter = Router();

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

userRouter.patch(
  '/updateMe',
  authMiddleware,
  asyncErrorHandler(UserController.updateMe)
);

userRouter.route('/').get(asyncErrorHandler(UserController.getAllUsers));

userRouter
  .route('/:id')
  .get(asyncErrorHandler(UserController.getOneUser))
  .patch(asyncErrorHandler(UserController.updateUser))
  .delete(asyncErrorHandler(UserController.deleteUser));

module.exports = userRouter;
