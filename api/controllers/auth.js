const AuthService = require('../services/auth');

class AuthController {
  async signup(req, res) {
    const user = req.body;

    const newUser = await AuthService.signup(user);

    res.status(201).json({ newUser });
  }

  async login(req, res) {
    const { email, password } = req.body;

    const tokens = await AuthService.login(email, password);

    res.json({ tokens });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    const tokens = await AuthService.forgotPassword(email);

    res.json({ tokens });
  }

  async resetPassword(req, res) {
    const { email, password } = req.body;

    const tokens = await AuthService.resetPassword(email, resetPassword);

    res.json({ tokens });
  }
}

module.exports = new AuthController();
