const Router = require('express');

const { VERSION } = require('../../configs');
const userRouter = require('./user');
const tourRouter = require('./tour');
const { authMiddleware } = require('../../middlewares/auth');
const CustomHTTPError = require('../../utils/error');

const router = new Router();

router.use(`/${VERSION}/users`, userRouter);
router.use(`/${VERSION}`, authMiddleware);
router.use(`/${VERSION}/tours`, tourRouter);

router.all('*', (req, res, next) => {
  next(CustomHTTPError.NotFound());
});

module.exports = router;
