const express = require('express');

const router = express.Router();

router.get('/list-of-sellers', (req, res) => {
  res.send({ message: 'API is working' });
});

router.get('/seller-catalog/:sellerId', (req, res) => {
  res.send({ message: 'API is working' });
});

router.post('/create-order/:seller_id', (req, res) => {
  res.send({ message: 'API is working' });
});

module.exports = router;
