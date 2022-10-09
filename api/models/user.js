const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name, this field cannot be empty'],
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
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  photo: String,
});

const User = model('User', userSchema);

module.exports = User;
