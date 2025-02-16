const Dog = require("./dog.model.js");

class DogRepository {
  async getAllDogs() {
    try {
      const dogs = await Dog.find();
      return dogs;
    } catch (error) {
      throw new Error("Error fetching dogs: " + error.message);
    }
  }
  async getDogByOwnerId(ownerId) {
    try {
      const dogs = await Dog.find({ owner: ownerId });
      return dogs;
    } catch (error) {
      throw new Error("Error fetching dogs by owner ID: " + error.message);
    }
  }

  async getDogById(id) {
    try {
      const dog = await Dog.findById(id);
      return dog;
    } catch (error) {
      throw new Error("Error fetching dog: " + error.message);
    }
  }

  async create(dog) {
    try {
      console.log({dog});
      const newDog = new Dog(dog);
      console.log(newDog);
      const savedDog = await newDog.save();
      return savedDog;
    } catch (error) {
      throw new Error("Error creating dog: " + error.message);
    }
  }

  async updateDog(id, dog) {
    try {
      const updatedDog = await Dog.findByIdAndUpdate(id, dog, { new: true });
      return updatedDog;
    } catch (error) {
      throw new Error("Error updating dog: " + error.message);
    }
  }

  async deleteDog(id) {
    try {
      await Dog.findByIdAndDelete(id);
      return { message: "Dog deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting dog: " + error.message);
    }
  }
}

module.exports = new DogRepository();
