const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

exports.isAuth = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    res.status(403).json({
      status: 403,
      message: "Where is your token dude ?!",
    });
  } else {
    try {
      const decode = jwt.decode(token, TOKEN_KEY);
      if (!decode) {
        res.status(404).json({ status: 404, message: "Token not valid!" });
      }
      req.user = decode;

      if (req.user.role !== "admin") {
        res.status(403).json({ status: 403, message: "Admin Only !" });
      }
      next();
    } catch (e) {
      res.status(400).json({
        status: 400,
        message: "Invalid Token",
      });
    }
  }
};

exports.isLogin = (req, res, next) => {
  if (!req.user) {
    res.status(400).json({ status: 400, message: "Login First !" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(403).json({ status: 403, message: "admin only !" });
  }
  next();
};
