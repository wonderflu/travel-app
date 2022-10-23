const AuthService = require('../services/auth');
const { COOKIE_OPTIONS } = require('../../consts/cookie');

class AuthController {
  async signup(req, res) {
    const user = req.body;

    const newUser = await AuthService.signup(user);

    res.status(201).json({ newUser });
  }

  async login(req, res) {
    const { email, password } = req.body;

    const tokens = await AuthService.login(email, password);

    res.cookie('refreshToken', tokens.refreshToken, COOKIE_OPTIONS);

    res.json({ tokens });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    await AuthService.forgotPassword(email);

    res.status(204).end();
  }

  async resetPassword(req, res) {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;

    const tokens = await AuthService.resetPassword(
      token,
      password,
      confirmPassword
    );

    res.json({ tokens });
  }

  async updatePassword(req, res) {
    const { id } = req.user;
    const { currentPassword, password, confirmPassword } = req.body;

    const tokens = await AuthService.updatePassword(
      id,
      currentPassword,
      password,
      confirmPassword
    );

    res.json({ tokens });
  }
}

module.exports = new AuthController();
