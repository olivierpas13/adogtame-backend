const userService = require("./user.service");

class UserController {
  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async editUser(req, res) {
    try {
      const user = await userService.editUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async toggleFavorite(req, res) {
    try {
      const user = await userService.toggleFavoriteDog(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getRescuers(req, res) {
    try {
      const rescuers = await userService.getRescuers();
      res.json(rescuers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getShelters(req, res) {
    try {
      const shelters = await userService.getShelters();
      res.json(shelters);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
