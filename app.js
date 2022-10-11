const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();
const router = require('./api/routes/index');
const { TOO_MANY_REQUESTS } = require('./consts/error');
const {
  tourFields: {
    DURATION,
    MAXGROUPSIZE,
    DIFFICULTY,
    RATINGSQUANTITY,
    RATINGSAVERAGE,
    PRICE,
  },
} = require('./consts/tourFields');

const errorHandler = require('./middlewares/errorHandler');

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: TOO_MANY_REQUESTS,
});

app.use(helmet());
app.use('/api', limiter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize()); // against query ingections attacks. looks at the req.body, req.query, req.params and filter out all $ signs and . - this is how mongoDB operators are written
app.use(xss()); // against mal html code > convert all html symbols <div> etc
app.use(
  hpp({
    whitelist: [
      DURATION,
      MAXGROUPSIZE,
      DIFFICULTY,
      RATINGSQUANTITY,
      RATINGSAVERAGE,
      PRICE,
    ],
  })
); //prevent param polution, clear up the q string, no dupli queries
app.use('/api', router);
app.use(errorHandler);

module.exports = app;
