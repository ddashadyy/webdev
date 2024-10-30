const Router = require('express');
const router = new Router();
const wishListController = require("../controller/wishListController");

router.post("/create", wishListController.createNewWishList);
router.post("/update/:id", wishListController.updateWishList);

module.exports = router;