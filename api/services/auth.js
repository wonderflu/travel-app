const crypto = require('crypto');
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
  EMAIL_NOT_SENT,
  INVALID_TOKEN,
  WRONG_PASSWORD,
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

    try {
      await EmailService.SendEmail(email, RESET_PASSWORD, {
        resetToken,
        name: user.name,
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save({ validateBeforeSave: false });

      throw CustomHTTPError.BadRequest(EMAIL_NOT_SENT);
    }
  }

  async resetPassword(token, password, confirmPassword) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await UserSchema.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw CustomHTTPError.BadRequest(INVALID_TOKEN);
    }

    user.password = password;
    user.confirmPassword = confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    const tokens = TokenService.generateTokens({
      id: user._id,
      role: user.role,
    });

    return tokens;
  }

  async updatePassword(id, currentPassword, password, confirmPassword) {
    const user = await UserSchema.findById(id).select('+password');

    if (!(await user.correctPassword(currentPassword, user.password))) {
      throw CustomHTTPError.BadRequest(WRONG_PASSWORD);
    }

    user.password = password;
    user.confirmPassword = confirmPassword;
    // cant user here findByIdAndUpdate coz validation in the model will not be applied, mogoose doesn't keep the current object in memory, we MUST use save here

    await user.save();

    const tokens = TokenService.generateTokens({
      id: user._id,
      role: user.role,
    });

    return tokens;
  }
}

module.exports = new AuthService();
