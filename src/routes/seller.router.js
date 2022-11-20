const express = require('express');

const router = express.Router();
const sellerController = require('../controllers/seller.controller');

router.use('/', (req, res, next) => {
  if (!req.user || !req.user.name) {
    res.status(400).send({ status: 'BAD REQUEST', message: 'name and/or password is null.' });
    return;
  }

  if (req.user.type !== 'seller') {
    res.status(403).send({ status: 'FORBIDDEN', message: 'User not authorized to access this endpoint' });
    return;
  }

  next();
});

router.post('/create-catalog', sellerController.createCatalog);
router.get('/order', sellerController.orders);
router.get('/catalog-details', sellerController.catalogDetails);

module.exports = router;
