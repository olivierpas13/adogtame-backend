const userRepository = require("./user.repository");

class UserService {
  async getUserById(id) {
    return await userRepository.getUserById(id);
  }
  async editUser(id, user) {
    return await userRepository.editUser(id, user);
  }
  async toggleFavoriteDog(userId, dog) {
    return await userRepository.toggleFavoriteDog(userId, dog);
  }

  async getRescuers() {
    return await userRepository.getRescuers();
  }
}

module.exports = new UserService();
