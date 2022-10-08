const Router = require('express');

const tourController = require('../controllers/tour');

const tourRouter = Router();

tourRouter
  .route('/')
  .get(asyncErrorHandler(tourController.getAllTours))
  .post(asyncErrorHandler(tourController.createTour));

tourRouter
  .route('/:id')
  .get(asyncErrorHandler(tourController.getOneTour))
  .patch(asyncErrorHandler(tourController.updateTour))
  .delete(asyncErrorHandler(tourController.deleteTour));

module.exports = tourRouter;
