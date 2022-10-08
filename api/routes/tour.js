const Router = require('express');

const tourController = require('../controllers/tour');
const aliasTopTours = require('../middlewares/topFive');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const idValidation = require('../middlewares/idValidation');

const tourRouter = Router();

tourRouter.param('id', idValidation);

tourRouter
  .route('/tours/top-5')
  .get(aliasTopTours, asyncErrorHandler(tourController.getAllTours));

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
