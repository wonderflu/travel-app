const UserSchema = require('../models/user');
const CustomHTTPError = require('../../utils/error');
const { USER_NOT_FOUND } = require('../../consts/error');

class UserService {
  async getAllUsers() {
    const users = await UserSchema.find({});

    return users;
  }

  async getOneUser(id) {
    const user = await UserSchema.findById(id);

    if (!user) {
      throw CustomHTTPError.BadRequest(USER_NOT_FOUND);
    }

    return user;
  }

  async updateTour(id, name) {
    const userToUpdate = await UserSchema.findByIdAndUpdate(id, price, {
      new: true,
      runValidators: true,
    });

    if (!userToUpdate) {
      throw CustomHTTPError.BadRequest(USER_NOT_FOUND);
    }

    return userToUpdate;
  }

  async deleteTour(id) {
    const userToDelete = await UserSchema.findByIdAndDelete(id);

    if (!userToDelete) {
      throw CustomHTTPError.BadRequest(USER_NOT_FOUND);
    }
  }
}

module.exports = new UserService();
