const Router = require('express');

const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');
const asyncErrorHandler = require('../../middlewares/asyncErrorHandler');

const userRouter = Router();

userRouter.post('/users/signup', asyncErrorHandler(AuthController.signup));

userRouter.route('/users/').get(asyncErrorHandler(UserController.getAllUsers));

userRouter
  .route('/users/:id')
  .get(asyncErrorHandler(UserController.getOneUser))
  .patch(asyncErrorHandler(UserController.updateUser))
  .delete(asyncErrorHandler(UserController.deleteUser));

module.exports = userRouter;
