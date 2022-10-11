const userRouter = require('express').Router();

const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');
const { authMiddleware, restrictTo } = require('../../middlewares/auth');
const { getMe } = require('../../middlewares/setCurrentUserId');
const asyncErrorHandler = require('../../middlewares/asyncErrorHandler');
const {
  roles: { ADMIN },
} = require('../../consts/roles');

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

userRouter.use(authMiddleware);

userRouter.get('/me', getMe, asyncErrorHandler(UserController.getOneUser));
userRouter.patch(
  '/updateMyPassword',
  asyncErrorHandler(AuthController.updatePassword)
);
userRouter.patch('/updateMe', asyncErrorHandler(UserController.updateMe));
userRouter.delete('/deleteMe', asyncErrorHandler(UserController.deleteMe));

userRouter.use(restrictTo(ADMIN));

userRouter.route('/').get(asyncErrorHandler(UserController.getAllUsers));
userRouter
  .route('/:id')
  .get(asyncErrorHandler(UserController.getOneUser))
  .patch(asyncErrorHandler(UserController.updateUser))
  .delete(asyncErrorHandler(UserController.deleteUser));

module.exports = userRouter;
