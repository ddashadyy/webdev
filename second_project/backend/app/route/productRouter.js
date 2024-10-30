const Router = require("express");
const router = new Router();
const productController = require("../controller/productController");


router.post('/addProduct', productController.createNewProduct);
router.post('/deleteProduct/:id', productController.deleteProductById);
router.post('/updateProduct/:id', productController.updateProductById);

router.get('/listProducts', productController.getAllProducts);
router.get('/getProductById/:id', productController.getProductById);
router.get('/getProductByCategory/:categoryId', productController.getProductByCategory);


module.exports = router;