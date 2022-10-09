const Router = require('express');

const TourController = require('../controllers/tour');
const aliasTopTours = require('../../middlewares/topFive');
const asyncErrorHandler = require('../../middlewares/asyncErrorHandler');

const tourRouter = Router();

tourRouter
  .route('/tours/top-5')
  .get(aliasTopTours, asyncErrorHandler(TourController.getAllTours));

tourRouter
  .route('/tours/tour-stats')
  .get(asyncErrorHandler(TourController.getTourStats));

tourRouter
  .route('/tours/monthly-plan/:year')
  .get(asyncErrorHandler(TourController.getMonthlyPlan));

tourRouter
  .route('/tours/')
  .get(asyncErrorHandler(TourController.getAllTours))
  .post(asyncErrorHandler(TourController.createTour));

tourRouter
  .route('/tours/:id')
  .get(asyncErrorHandler(TourController.getOneTour))
  .patch(asyncErrorHandler(TourController.updateTour))
  .delete(asyncErrorHandler(TourController.deleteTour));

module.exports = tourRouter;
