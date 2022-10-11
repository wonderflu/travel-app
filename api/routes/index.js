const router = require('express').Router();

const { VERSION } = require('../../configs');
const userRouter = require('./user');
const tourRouter = require('./tour');
const reviewRouter = require('./review');
const { authMiddleware } = require('../../middlewares/auth');
const CustomHTTPError = require('../../utils/error');

router.use(`/${VERSION}/users`, userRouter);
router.use(`/${VERSION}/reviews`, reviewRouter);
router.use(`/${VERSION}`, authMiddleware);
router.use(`/${VERSION}/tours`, tourRouter);

router.all('*', (req, res, next) => {
  next(CustomHTTPError.NotFound());
});

module.exports = router;
