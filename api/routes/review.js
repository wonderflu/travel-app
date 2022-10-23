const reviewRouter = require('express').Router({ mergeParams: true }); // gives access to a parent route (tourID)

const ReviewController = require('../controllers/review');
const { authMiddleware, restrictTo } = require('../../middlewares/auth');
const { UserAndTourIds } = require('../../middlewares/setUserTourId');
const asyncErrorHandler = require('../../middlewares/asyncErrorHandler');
const {
  roles: { USER, ADMIN },
} = require('../../consts/roles');

reviewRouter.use(authMiddleware);

reviewRouter
  .route('/')
  .get(asyncErrorHandler(ReviewController.getAllReviews))
  .post(
    restrictTo(USER),
    UserAndTourIds,
    asyncErrorHandler(ReviewController.createReview)
  );

reviewRouter
  .route('/:id')
  .get(asyncErrorHandler(ReviewController.getOneReview))
  .patch(
    restrictTo(USER, ADMIN),
    UserAndTourIds,
    asyncErrorHandler(ReviewController.updateReview)
  )
  .delete(
    restrictTo(USER, ADMIN),
    UserAndTourIds,
    asyncErrorHandler(ReviewController.deleteReview)
  );

module.exports = reviewRouter;
