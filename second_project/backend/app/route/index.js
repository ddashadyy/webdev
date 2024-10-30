const Router = require("express");
const router = new Router();

const cartRouter = require("./cartRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const wishListRouter = require("./wishListRouter");

router.use('/cart', cartRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/wishlist', wishListRouter);

module.exports = router;