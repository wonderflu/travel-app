const UserSchema = require('../models/user');
const TokenService = require('../services/token');
const EmailService = require('../../utils/email');
const CustomHTTPError = require('../../utils/error');
const {
  emailSubject: { RESET_PASSWORD },
} = require('../../consts/emailSubject');
const {
  NO_CREDENTIALS,
  INCORRECT_CREDENTIALS,
  USER_NOT_FOUND,
  NO_EMAIL,
} = require('../../consts/error');

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

  async forgotPassword(email) {
    if (!email) {
      throw CustomHTTPError.BadRequest(NO_EMAIL);
    }

    const user = await UserSchema.findOne({ email });

    if (!user) {
      throw CustomHTTPError.BadRequest(USER_NOT_FOUND);
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    await EmailService.SendEmail(email, RESET_PASSWORD, {
      resetToken,
      name: user.name,
    });
  }
}

module.exports = new AuthService();
