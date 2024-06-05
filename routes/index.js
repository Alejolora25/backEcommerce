const express = require('express');
const roleRouter = require('./roleRoute');
const userRouter = require('./userRoute');
const categoryRouter = require('./categoryRoute');
const productRouter = require('./productRoute');
const imageRouter = require('./imageRoute')
const ratingRouter = require('./ratingRoute')
const orderRouter = require('./orderRoute');

const router = express.Router();

router.use('/roles', roleRouter); // endpoint types
router.use('/users', userRouter); // endpoint users
router.use('/categories', categoryRouter); // endpoint categories
router.use('/products', productRouter); // endpoint products
router.use('/images', imageRouter); // endpoint products
router.use('/ratings', ratingRouter); // endpoint ratings
router.use('/orders', orderRouter); // endpoint orders


module.exports = router;