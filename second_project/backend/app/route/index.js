const Router = require("express");
const router = new Router();

const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");


router.use('/category', categoryRouter);
router.use('/product', productRouter);


module.exports = router;