const CustomHTTPError = require('../../utils/error');

const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err instanceof CustomHTTPError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

module.exports = errorHandler;
