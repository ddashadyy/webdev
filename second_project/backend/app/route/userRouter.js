const Router = require('express');
const router = new Router();
const userController = require("../controller/userController");

router.post("/registration", userController.registrateUser);
router.post("/login", userController.logInUser);
router.post("/logout", userController.logOutUser);
router.post("/update/:id", userController.updateUsersInformation);
router.get("/getall", userController.getAllUsers);
router.get("/getuser/:id", userController.getUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;