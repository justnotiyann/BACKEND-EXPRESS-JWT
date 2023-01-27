const bcrypt = require("bcryptjs");
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
    const hashPass = await bcrypt.hash(password, 10);

    // create user
    const result = new User({
      first_name,
      last_name,
      email,
      password: hashPass,
    });
    result.save();

    // create token
    const token = jwt.sign(
      {
        email: email,
        role: result.role,
        isLogin: true,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    result.token = token;

    if (!result) {
      res.status(500).json({ status: 500, message: "Failed to register" });
    }

    res.status(200).json({ status: 200, message: "Success !", data: result });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      res.status(400).json({ message: "All input required" });
    }

    // check user
    const result = await User.findOne({ email });
    if (result && (await bcrypt.compare(password, result.password))) {
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
        message: "Welcome 😎",
        token,
      });
    } else {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
    if (!result) {
      res.status(500).json({ status: 500, message: "Failed to register" });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.dashboard = async (req, res, next) => {
  try {
    const result = await User.find({}).select("-password");
    res.status(200).json({
      status: 200,
      data: result,
    });
    if (!result) {
      res.status(500).json({ status: 500, message: "Failed to register" });
    }
  } catch (e) {}
};
