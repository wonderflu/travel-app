const router = require('express').Router();

const { VERSION } = require('../../configs');
const userRouter = require('./user');
const tourRouter = require('./tour');
const reviewRouter = require('./review');
const CustomHTTPError = require('../../utils/error');

router.use(`/${VERSION}/users`, userRouter);
router.use(`/${VERSION}/tours`, tourRouter);
router.use(`/${VERSION}/reviews`, reviewRouter);

router.all('*', (req, res, next) => {
  next(CustomHTTPError.NotFound());
});

module.exports = router;
