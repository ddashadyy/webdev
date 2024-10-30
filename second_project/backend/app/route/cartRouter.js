const Router = require("express");
const router = new Router();
const cartController = require("../controller/cartController");

router.post("/create", cartController.createNewCart);
router.post("/update/:id", cartController.updateCart);
router.delete("/delete/:id", cartController.deleteCart);

module.exports = router;