const User = require("./user.model.js");

class UserRepository {
  async getUserById(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }
}

module.exports = new UserRepository();
