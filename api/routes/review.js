const reviewRouter = require('express').Router({ mergeParams: true }); // gives access to a parent route (tourID)

const ReviewController = require('../controllers/review');
const { authMiddleware, restrictTo } = require('../../middlewares/auth');
const asyncErrorHandler = require('../../middlewares/asyncErrorHandler');
const {
  roles: { USER },
} = require('../../consts/roles');

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
