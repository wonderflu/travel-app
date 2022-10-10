const UserService = require('../services/user');

class UserController {
  async getAllUsers(req, res) {
    const users = await UserService.getAllUsers();

    res.json({ users });
  }

  async updateMe(req, res) {
    const { id } = req.user;
    const user = req.body;

    const updatedUser = await UserService.updateMe(id, user);

    res.json({ updatedUser });
  }

  async getOneUser(req, res) {
    const { id } = req.params;

    const user = await UserService.getOneUser(id);

    res.json({ user });
  }

  async updateUser(req, res) {
    const { id } = req.params.id;
    const { name } = req.body;

    const userToUpdate = await UserService.updateUser(id, name);

    res.json({ userToUpdate });
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    await UserService.deleteUser(id);

    res.status(204).json();
  }
}

module.exports = new UserController();
