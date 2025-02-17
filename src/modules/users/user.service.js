const userRepository = require('./user.repository');

class UserService {
  async getUserById(id) {
    return await userRepository.getUserById(id);
  }
}

module.exports = new UserService();