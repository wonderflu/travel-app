const UserSchema = require('../models/user');
const CustomHTTPError = require('../../utils/error');
const { CANNOT_UPDATE, USER_NOT_FOUND } = require('../../consts/error');
const filterObj = require('../../utils/filterObject');

class UserService {
  async getAllUsers() {
    const users = await UserSchema.find({});

    return users;
  }

  async updateMe(id, user) {
    if (user.password || user.confirmPassword) {
      throw CustomHTTPError.BadRequest(CANNOT_UPDATE);
    }

    const filteredBody = filterObj(user, 'name', 'email');
    const updatedUser = await UserSchema.findByIdAndUpdate(id, filteredBody, {
      new: true,
      runValidators: true,
    });

    return updatedUser;
  }

  async getOneUser(id) {
    const user = await UserSchema.findById(id);

    if (!user) {
      throw CustomHTTPError.BadRequest(USER_NOT_FOUND);
    }

    return user;
  }

  async updateUser(id, name) {
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
