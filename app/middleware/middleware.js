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
  }

  try {
    const decode = jwt.decode(token, TOKEN_KEY);
    req.user = decode;
    if (!req.user.isLogin) {
      res.status(403).json({ status: 400, message: "Login First" });
    }
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: "Invalid Token",
    });
  }
};
