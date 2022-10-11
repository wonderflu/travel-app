const tourRouter = require('express').Router();

const TourController = require('../controllers/tour');
const reviewRouter = require('./review');
const aliasTopTours = require('../../middlewares/topFive');
const { restrictTo } = require('../../middlewares/auth');
const asyncErrorHandler = require('../../middlewares/asyncErrorHandler');
const {
  roles: { LEAD_GUIDE, ADMIN },
} = require('../../consts/roles');

tourRouter.use('/:id/reviews', reviewRouter);

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

module.exports = tourRouter;
