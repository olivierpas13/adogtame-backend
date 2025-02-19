const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "user",
      enum: ["user", "rescuer", "shelter"],
    },
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    dogs: {
      type: [Object],
    },
    emailVerified: {
      type: Boolean,
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
    },
    favorites: {
      type: [Object],
    },
    sponsored: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "user");

module.exports = User;
