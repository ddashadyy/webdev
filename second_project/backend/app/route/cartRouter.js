const Router = require("express");
const router = new Router();
const cartController = require("../controller/cartController");

router.get('/getCart/:id', cartController.getCart);
router.post('/addProductToCart', cartController.addProductToCart);
router.post('/deleteProductFromCart', cartController.deleteProductFromCart);


module.exports = router;