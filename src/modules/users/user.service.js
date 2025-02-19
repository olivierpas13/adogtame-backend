const userRepository = require('./user.repository');

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
}

module.exports = new UserService();