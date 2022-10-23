const tourRouter = require('express').Router();

const TourController = require('../controllers/tour');
const reviewRouter = require('./review');
const aliasTopTours = require('../../middlewares/topFive');
const { authMiddleware, restrictTo } = require('../../middlewares/auth');
const asyncErrorHandler = require('../../middlewares/asyncErrorHandler');
const {
  roles: { LEAD_GUIDE, ADMIN, GUIDE },
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
  .get(
    authMiddleware,
    restrictTo(ADMIN, LEAD_GUIDE, GUIDE),
    asyncErrorHandler(TourController.getMonthlyPlan)
  );

tourRouter
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(asyncErrorHandler(TourController.getToursWithin));

tourRouter
  .route('/distances/:latlng/unit/:unit')
  .get(asyncErrorHandler(TourController.getDistances));

tourRouter
  .route('/')
  .get(asyncErrorHandler(TourController.getAllTours))
  .post(
    authMiddleware,
    restrictTo(ADMIN, LEAD_GUIDE),
    asyncErrorHandler(TourController.createTour)
  );

tourRouter
  .route('/:id')
  .get(asyncErrorHandler(TourController.getOneTour))
  .patch(
    authMiddleware,
    restrictTo(ADMIN, LEAD_GUIDE),
    asyncErrorHandler(TourController.updateTour)
  )
  .delete(
    authMiddleware,
    restrictTo(ADMIN, LEAD_GUIDE),
    asyncErrorHandler(TourController.deleteTour)
  );

module.exports = tourRouter;
