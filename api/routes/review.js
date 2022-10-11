const Router = require('express');

const ReviewController = require('../controllers/review');
const { authMiddleware, restrictTo } = require('../../middlewares/auth');
const asyncErrorHandler = require('../../middlewares/asyncErrorHandler');
const {
  roles: { USER },
} = require('../../consts/roles');

const reviewRouter = Router();

reviewRouter
  .route('/')
  .get(asyncErrorHandler(ReviewController.getAllReviews))
  .post(
    authMiddleware,
    restrictTo(USER),
    asyncErrorHandler(ReviewController.createReview)
  );

reviewRouter
  .route('/:id')
  .patch(
    authMiddleware,
    restrictTo(USER),
    asyncErrorHandler(ReviewController.updateReview)
  );

module.exports = reviewRouter;
