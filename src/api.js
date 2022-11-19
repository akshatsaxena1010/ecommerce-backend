const express = require('express');

const router = express.Router();
const authRouter = require('./routes/auth.router');
const buyerRouter = require('./routes/buyer.router');
const sellerRouter = require('./routes/seller.router');

router.use('/auth', authRouter);
router.use('/buyer', buyerRouter);
router.use('/seller', sellerRouter);

module.exports = router;
