const Router = require("express");
const router = new Router();
const categoryController = require("../controller/categoryController");


router.post('/addCategory', categoryController.createNewCategory);
router.post('/updateCategory/:id', categoryController.updateCategoryById);
router.post('/deleteCategoryById/:id', categoryController.deleteCategoryById);

router.get('/getAllCategories', categoryController.getAllCategories);
router.get('/getCategoryById/:id', categoryController.getCategoryById);
router.get('/getCategoryByName/:name', categoryController.getCategoryByName);


module.exports = router;