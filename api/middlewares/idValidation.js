const mongoose = require('mongoose');
const CustomHTTPError = require('../../utils/error');
const { INVALID_ID } = require('../../consts/error');

const idValidation = (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw CustomHTTPError.BadRequest(INVALID_ID);
  }
  next();
};

module.exports = idValidation;
