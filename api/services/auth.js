const UserSchema = require('../models/user');

class AuthService {
  async signup(user) {
    const newUser = await UserSchema.create({ ...user });

    return newUser;
  }
}

module.exports = new AuthService();
