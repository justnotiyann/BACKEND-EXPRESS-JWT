const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fname: { type: String, default: null },
  lname: { type: String, default: null },
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
});

const User = mongoose.model("user", UserSchema);

const QuizSchema = new mongoose.Schema({
  quiz: {
    type: String,
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
  author: UserSchema,
});

const Quiz = mongoose.model("quiz", QuizSchema);

module.exports = { User, Quiz };
