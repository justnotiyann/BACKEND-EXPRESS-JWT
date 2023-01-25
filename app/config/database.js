const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URL } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
    })
    .then(() => console.log("berhasil terhubung ke database"))
    .catch((e) => {
      console.log("database connection failed. exiting now...");
      console.error(e);
      process.exit(1);
    });
};
