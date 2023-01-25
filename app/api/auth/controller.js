const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/Users");
require("dotenv").config();

exports.register = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    if (!(first_name, last_name, email, password)) {
      res.status(400).json({ msg: "All input is required" });
    }

    // check olduser
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res.status(409).status({ msg: "User Already Exist" });
    }

    // Encrypt password
    const hashPass = await bcryptjs(password, 10);

    // create user
    const result = new User({
      first_name,
      last_name,
      email,
      password: hashPass,
    });

    // create token
    const token = jwt.sign(
      { user_id: result._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    result.token = token;

    res.status(200).json({
      status: 200,
      message: "user Created",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  try {
  } catch (error) {}
};
