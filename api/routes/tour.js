const Router = require('express');

const TourController = require('../controllers/tour');
const ReviewController = require('../controllers/review');
const aliasTopTours = require('../../middlewares/topFive');
const { restrictTo } = require('../../middlewares/auth');
const asyncErrorHandler = require('../../middlewares/asyncErrorHandler');
const {
  roles: { LEAD_GUIDE, ADMIN, USER },
} = require('../../consts/roles');

const tourRouter = Router();

tourRouter
  .route('/top-5')
  .get(aliasTopTours, asyncErrorHandler(TourController.getAllTours));

tourRouter
  .route('/tour-stats')
  .get(asyncErrorHandler(TourController.getTourStats));

tourRouter
  .route('/monthly-plan/:year')
  .get(asyncErrorHandler(TourController.getMonthlyPlan));

tourRouter
  .route('/')
  .get(asyncErrorHandler(TourController.getAllTours))
  .post(asyncErrorHandler(TourController.createTour));

tourRouter
  .route('/:id')
  .get(asyncErrorHandler(TourController.getOneTour))
  .patch(
    restrictTo(ADMIN, LEAD_GUIDE),
    asyncErrorHandler(TourController.updateTour)
  )
  .delete(
    restrictTo(ADMIN, LEAD_GUIDE),
    asyncErrorHandler(TourController.deleteTour)
  );

tourRouter
  .route('/:id/reviews/')
  .post(restrictTo(USER), asyncErrorHandler(ReviewController.createReview));

module.exports = tourRouter;
