const { Schema, model } = require("mongoose");
const { Subscription } = require("../config/constants");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate(value) {
      const re = /^.+@.+\..+$/;
      return re.test(String(value).toLowerCase());
    },
    subscription: {
      type: String,
      enum: {
        values: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
        message: "Unknown subscription type",
      },
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
});

const User = model("user", userSchema);

module.exports = User;
