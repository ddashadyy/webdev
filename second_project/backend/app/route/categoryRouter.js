const Router = require("express");
const router = new Router();
const categoryController = require("../controller/categoryController");

router.post("/create", categoryController.createNewCategory);
router.post("/update/:id", categoryController.updateCategory);
router.get("/getall", categoryController.getAllCategories);
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;