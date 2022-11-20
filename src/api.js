const express = require('express');

const router = express.Router();
const authRouter = require('./routes/auth.router');
const buyerRouter = require('./routes/buyer.router');
const sellerRouter = require('./routes/seller.router');
const authHelper = require('./helpers/auth.helper');

router.use('/auth', authRouter);
router.use('/buyer', authHelper.authenticateToken, buyerRouter);
router.use('/seller', authHelper.authenticateToken, sellerRouter);

module.exports = router;
