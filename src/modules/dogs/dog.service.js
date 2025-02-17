const dogRepository = require("./dog.repository.js");

class DogService {
  async getAllDogs() {
    return await dogRepository.getAllDogs();
  }

  async getAllDogsByOwnerId(ownerId) {
    return await dogRepository.find({ ownerId });
  }

  async getDogById(id) {
    return await dogRepository.getDogById(id);
  }

  async addDog(dog) {
    dog.adopted = false;
    return await dogRepository.create(dog);
  }

  async updateDog(id, updatedDog) {
    const existingDog = await dogRepository.findById(id);
    if (existingDog) {
      return await dogRepository.update(id, updatedDog);
    }
    return null;
  }

  async deleteDog(id) {
    const existingDog = await dogRepository.findById(id);
    if (existingDog) {
      return await dogRepository.delete(id);
    }
    return null;
  }
}

module.exports = new DogService();
