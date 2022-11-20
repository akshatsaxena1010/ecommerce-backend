const express = require('express');

const router = express.Router();
const sellerController = require('../controllers/seller.controller');

router.use('/', sellerController.validateSeller);

router.post('/create-catalog', sellerController.createCatalog);
router.get('/order', sellerController.orders);
router.get('/catalog-details', sellerController.catalogDetails);

module.exports = router;
