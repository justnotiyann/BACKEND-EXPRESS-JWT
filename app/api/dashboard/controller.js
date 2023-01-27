const { Quiz } = require("../../model");

module.exports = {
  index: async (req, res, next) => {
    const result = await Quiz.find();
    if (!result) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
    res.status(200).json({ status: 200, message: "Success", data: result });
  },
  store: async (req, res, next) => {
    const { author, option_a, option_b, option_c, answer } = req.body;
    if (!(author && option_a && option_b && option_c && answer)) {
      res.status(400).json({ status: 400, message: "All input are required" });
    }

    const result = new Quiz({
      // author:req.user.email
    }).save();
    if (!result) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }

    res.status(201).json({ status: 201, message: "Created", data: result });
  },
  show: async (req, res, next) => {
    res.json("hai");
  },
  update: async (req, res, next) => {
    res.json("hai");
  },
  delete: async (req, res, next) => {
    res.json("hai");
  },
};
