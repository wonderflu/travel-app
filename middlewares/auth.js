const TokenService = require('../api/services/token');
const UserSchema = require('../api/models/user');
const CustomHTTPError = require('../utils/error');

const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return next(CustomHTTPError.Unauthorized());
  }

  const accessToken = authorizationHeader.split(' ')[1];

  if (!accessToken) {
    return next(CustomHTTPError.Unauthorized());
  }

  const decodedData = TokenService.decodeAccessToken(accessToken);

  if (!decodedData) {
    return next(CustomHTTPError.Unauthorized());
  }

  const foundUser = await UserSchema.findById(decodedData.id);

  if (!foundUser) {
    return next(CustomHTTPError.Unauthorized());
  }

  if (foundUser.changedPasswordAfter(decodedData.iat)) {
    return next(CustomHTTPError.Unauthorized());
  }

  req.user = foundUser;

  next();
};

module.exports = authMiddleware;
