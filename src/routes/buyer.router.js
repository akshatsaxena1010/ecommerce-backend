const express = require('express');

const router = express.Router();
const buyerController = require('../controllers/buyer.controller');

router.use('/', buyerController.validateBuyer);

router.get('/list-of-sellers', buyerController.listOfSellers);
router.get('/seller-catalog/:sellerId', buyerController.sellerCatalog);
router.post('/create-order/:sellerId', buyerController.createOrder);

module.exports = router;
