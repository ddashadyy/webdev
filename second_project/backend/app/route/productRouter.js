const Router = require("express");
const router = new Router();
const productController = require("../controller/productController");

router.post("/create", productController.createNewProduct);
router.post("/update/:id", productController.updateProduct);
router.post("/update/:id/:categoryid", productController.updateProductsCategory);
router.get("/getall", productController.getAllProducts);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;