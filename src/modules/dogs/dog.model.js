const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    pfp: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    breed: {
      type: String,
      required: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    size: {
      type: String,
      enum: ["small", "medium", "big"],
    },
    weight: {
      type: Number,
    },
    fur: {
      type: String,
      enum: ["short", "medium", "long"],
    },
    color: {
      type: String,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    location: {
      type: String,
    },
    vaccinated: {
      type: Boolean,
    },
    sterilized: {
      type: Boolean,
    },
    adopted: {
      type: Boolean,
    },
    sponsors: {
      type: [String],
    },
    description: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    specialNeeds: {
      type: [String],
    },
    characteristics: {
      type: [String],
    },
    adoptantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shelterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelter",
    },
  },
  {
    timestamps: true,
  }
);

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
