const { Quiz } = require("../../model");

module.exports = {
  index: async (req, res, next) => {
    const result = await Quiz.find({});

    if (!result) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
    res.status(200).json({ status: 200, message: "Success", data: result });
  },

  // store: async (req, res, next) => {
  //   const { quiz, option_a, option_b, option_c, answer } = req.body;
  //   const result = new Quiz({
  //     quiz,
  //     option_a,
  //     option_b,
  //     option_c,
  //     answer,
  //     author: {
  //       fname: req.user.fname,
  //       lname: req.user.lname,
  //     },
  //   });
  //   result.save();

  //   if (!result) {
  //     res.status(500).json({ status: 500, message: "Internal Server Error" });
  //   }

  //   res.status(201).json({ status: 201, message: "Created", data: result });
  // },
  store: async (req, res, next) => {
    const { quiz, answer, option_a, option_b, option_c } = req.body;
    const { fname, lname } = req.user;

    const result = new Quiz({
      quiz,
      answer,
      option_a,
      option_b,
      option_c,
      author: {
        fname,
        lname,
      },
    });
    result.save();

    if (!result)
      return res.status(500).json({ status: 500, message: "Failed to save" });
    res.status(201).json({ status: 201, message: "created !", data: result });
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
