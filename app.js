const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const cors = require("cors");
require("dotenv").config();

require("./app/config/database").connect();

app.use(logger("dev"));
app.use(express.json(), cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const authRouter = require("./app/api/auth/router");
const quizRouter = require("./app/api/dashboard/router");
app.use(authRouter);

app.use("/dashboard", quizRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log("server up and running")
);

module.exports = app;
