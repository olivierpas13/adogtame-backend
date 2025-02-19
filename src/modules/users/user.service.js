const userRepository = require('./user.repository');

class UserService {
  async getUserById(id) {
    return await userRepository.getUserById(id);
  }
  async editUser(id, user) {
    return await userRepository.editUser(id, user);
  }
}

module.exports = new UserService();