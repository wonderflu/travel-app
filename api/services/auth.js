const UserSchema = require('../models/user');
const TokenService = require('../services/token');
const CustomHTTPError = require('../../utils/error');
const { NO_CREDENTIALS, INCORRECT_CREDENTIALS } = require('../../consts/error');

class AuthService {
  async signup(user) {
    const { name, email, password, confirmPassword } = user;

    const newUser = await UserSchema.create({
      name,
      email,
      password,
      confirmPassword,
    });

    return newUser;
  }

  async login(email, password) {
    if (!email || !password) {
      throw CustomHTTPError.BadRequest(NO_CREDENTIALS);
    }

    const user = await UserSchema.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw CustomHTTPError.BadRequest(INCORRECT_CREDENTIALS);
    }

    const tokens = TokenService.generateTokens({
      id: user._id,
      role: user.role,
    });

    return tokens;
  }
}

module.exports = new AuthService();
