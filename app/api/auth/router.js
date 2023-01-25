const router = require("express").Router();
const controller = require("./controller");
const { isAuth } = require("../../middleware/isAuth");

router.post("/login", controller.login);
router.post("/register", controller.register);

router.get("/dashboard", isAuth, controller.dashboard);

module.exports = router;
