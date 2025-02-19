const mongoose = require("mongoose");
const mongodb = require("mongodb");

const User = require("../users/user.model.js");
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
  async getDogByOwnerId(id) {
    try {
      const dogs = await Dog.find({ "owner.userId": id });
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
      const newDog = new Dog(dog);
      const savedDog = await newDog.save();

      const userId = new mongodb.ObjectId(`${dog.owner.userId}`);

      console.log(await User.findById(userId));

      await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            dogs: {
              dogId: savedDog._id, // Now using the saved dog's ID
              name: savedDog.name,
              pfp: savedDog.pfp,
            },
          },
        },
        { new: true }
      );
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
