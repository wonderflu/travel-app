const Router = require('express');

const { VERSION } = require('../../configs');
const tourRouter = require('./tour');

const router = new Router();

router.use(`/${VERSION}`, tourRouter);

module.exports = router;
