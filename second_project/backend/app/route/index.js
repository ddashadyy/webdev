const Router = require("express");
const router = new Router();

const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const authRouter = require("./authRouter");
const cartRouter = require("./cartRouter");

router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/auth', authRouter);
router.use('/cart', cartRouter);


module.exports = router;