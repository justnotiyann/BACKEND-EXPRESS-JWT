const router = require("express").Router();
const controller = require("./controller");
const { isAuth } = require("../../middleware");

router.get("/quiz", controller.index);
router.post("/quiz/add", isAuth, controller.store);
router.get("/quiz/detail/:id", controller.show);
router.put("/quiz/:id/update", controller.update);
router.delete("/quiz/:id/delete", controller.delete);

module.exports = router;
