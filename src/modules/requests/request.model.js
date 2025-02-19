const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RequestSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    dog: {
      type: Schema.Types.ObjectId,
      ref: "Dog",
      required: true,
    },
    owner:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    type:
    {
        type: String,
        required: true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

  },
  {
    timestamps: true,
  }
);

RequestSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Request", RequestSchema);
