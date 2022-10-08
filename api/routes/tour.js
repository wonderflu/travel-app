const Router = require('express');

const tourController = require('../controllers/tour');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

const tourRouter = Router();

tourRouter
  .route('/tours/')
  .get(asyncErrorHandler(tourController.getAllTours))
  .post(asyncErrorHandler(tourController.createTour));

tourRouter
  .route('/tours/:id')
  .get(asyncErrorHandler(tourController.getOneTour))
  .patch(asyncErrorHandler(tourController.updateTour))
  .delete(asyncErrorHandler(tourController.deleteTour));

module.exports = tourRouter;
