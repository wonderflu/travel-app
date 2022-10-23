const CustomHTTPError = require('../utils/error');

const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err instanceof CustomHTTPError) {
    return res
      .status(err.status)
      .json({ status: err.status, message: err.message });
  }

  if (err.name === 'CastError') {
    err.status = 400;
    const message = `Invalid ${err.path}: ${err.value}`;

    return res.status(400).json({ status: err.status, message });
  }

  if (err.code === 11000) {
    err.status = 400;
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value`;

    return res.status(400).json({ status: err.status, message });
  }

  if (err.name === 'ValidationError') {
    err.status = 400;
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Validation failed: ${errors.join('. ')}.`;

    return res.status(400).json({ status: err.status, message });
  }

  // if (err.name === 'JsonWebTokenError') {
  //   err.status = 401;
  //   const message = 'Invalid token, please log in again';

  //   return res.status(401).json({ status: err.status, message });
  // }

  return res.status(500).json({ message: err.message });
};

module.exports = errorHandler;
