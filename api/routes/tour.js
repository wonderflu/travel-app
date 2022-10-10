const Router = require('express');

const TourController = require('../controllers/tour');
const aliasTopTours = require('../../middlewares/topFive');
const { restrictTo } = require('../../middlewares/auth');
const asyncErrorHandler = require('../../middlewares/asyncErrorHandler');

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
    restrictTo('admin', 'lead-guide'),
    asyncErrorHandler(TourController.updateTour)
  )
  .delete(
    restrictTo('admin', 'lead-guide'),
    asyncErrorHandler(TourController.deleteTour)
  );

module.exports = tourRouter;
