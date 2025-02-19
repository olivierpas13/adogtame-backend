const User = require("./user.model.js");
const Dog = require("../dogs/dog.model.js");
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
      // Update the user document
      const updatedUser = await User.findByIdAndUpdate(
        new mongodb.ObjectId(`${id}`),
        user,
        {
          new: true,
          runValidators: true,
        }
      );
      const dogs = await Dog.find({"owner.userId": id});
      console.log(dogs);
      // Update all dogs that have this user as the owner
      await Dog.updateMany(
        { "owner.userId": id }, // Filter: find dogs with this user id
        {
          $set: {
            "owner.name": updatedUser.name,
            "owner.pfp": updatedUser.pfp,
            "owner.phone": updatedUser.phone,
          },
        }
      );
  
      return updatedUser;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }
  

  async toggleFavoriteDog(userId, dog) {
    try {
      // Find the user
      const user = await User.findById(new mongodb.ObjectId(`${userId}`));
      if (!user) {
        throw new Error("User not found");
      }

      // Check if the dog is already in favorites
      const isDogInFavorites = user.favorites.some(
        (fav) => fav._id.toString() === dog._id
      );

      let updatedUser;

      if (isDogInFavorites) {
        // Remove the dog from favorites
        updatedUser = await User.findByIdAndUpdate(
          userId,
          { $pull: { favorites: { _id: dog._id } } },
          { new: true }
        );
      } else {
        // Add the dog to favorites
        updatedUser = await User.findByIdAndUpdate(
          userId,
          { $push: { favorites: dog } },
          { new: true }
        );
      }

      return updatedUser;
    } catch (error) {
      throw new Error(`Error toggling favorite dog: ${error.message}`);
    }
  }
}
module.exports = new UserRepository();
