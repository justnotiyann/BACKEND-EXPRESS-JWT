const mongoose = require("mongoose");

module.exports = {
  User: mongoose.model("user", {
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    token: { type: String },
  }),
  Quiz: mongoose.model(
    "quiz",
    new mongoose.Schema({
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      option_a: {
        type: String,
      },
      option_b: {
        type: String,
      },
      option_c: {
        type: String,
      },
      answer: {
        type: String,
      },
    })
  ),
};
