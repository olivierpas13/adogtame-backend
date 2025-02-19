const User = require("./user.model.js");
const mongodb = require("mongodb");
class UserRepository {
  async getUserById(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  async editUser(id, user) {
    try {
      const updatedUser = await User.findByIdAndUpdate(new mongodb.ObjectId(`${id}`), user, {
        new: true,
        runValidators: true,
      });
      return updatedUser;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }
}

module.exports = new UserRepository();
