const Router = require("express");
const router = new Router();

const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const authRouter = require("./authRouter");

router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/auth', authRouter);


module.exports = router;