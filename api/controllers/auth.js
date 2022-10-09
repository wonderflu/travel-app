const AuthService = require('../services/auth');

class AuthController {
  async signup(req, res) {
    const user = req.body;

    const newUser = await AuthService.signup(user);

    res.status(201).json({ newUser });
  }
}

module.exports = new AuthController();
