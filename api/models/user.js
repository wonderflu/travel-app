const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const {
  roles: { USER, GUIDE, LEAD_GUIDE, ADMIN },
} = require('../../consts/roles');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name, this field cannot be empty'],
  },
  role: {
    type: String,
    enum: {
      values: [USER, GUIDE, LEAD_GUIDE, ADMIN],
      message: `Role can be either of those: ${USER}, ${GUIDE}, ${LEAD_GUIDE} or ${ADMIN}`,
    },
    default: USER,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email, this field cannot be empty'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password, this field cannot be empty'],
    minlength: [6, 'Password must have more or equal than 6 characters'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  photo: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  passwordToCompare,
  userPassword
) {
  return await bcrypt.compare(passwordToCompare, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTtimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTtimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = model('User', userSchema);

module.exports = User;
