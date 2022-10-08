const Router = require('express');

const { VERSION } = require('../../configs');
const tourRouter = require('./tour');
const CustomHTTPError = require('../../utils/error');

const router = new Router();

router.use(`/${VERSION}`, tourRouter);

router.all('*', (req, res, next) => {
  next(CustomHTTPError.NotFound());
});

module.exports = router;
