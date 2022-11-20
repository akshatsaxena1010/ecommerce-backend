const express = require('express');

const router = express.Router();
const buyerController = require('../controllers/buyer.controller');

router.use('/', (req, res, next) => {
  if (!req.user || !req.user.name) {
    res.status(400).send({ status: 'BAD REQUEST', message: 'name and/or password is null.' });
    return;
  }

  if (req.user.type !== 'buyer') {
    res.status(403).send({ status: 'FORBIDDEN', message: 'User not authorized to access this endpoint' });
    return;
  }

  next();
});

router.get('/list-of-sellers', buyerController.listOfSellers);
router.get('/seller-catalog/:sellerId', buyerController.sellerCatalog);
router.post('/create-order/:sellerId', buyerController.createOrder);

module.exports = router;
