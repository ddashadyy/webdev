const Router = require("express");
const router = new Router();
const authController = require("../controller/authController");

router.post('/register', authController.userRegistration);
router.post('/login', authController.login);
router.post('/refreshToken', authController.refreshToken);
router.post('/verify', authController.verify);

router.get('/getUserById/:id', authController.getUserById);

module.exports = router;
