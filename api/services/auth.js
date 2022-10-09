const UserSchema = require('../models/user');
const TokenService = require('../services/token');

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
}

module.exports = new AuthService();
