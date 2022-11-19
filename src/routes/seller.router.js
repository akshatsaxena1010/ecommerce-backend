const express = require('express');

const router = express.Router();

router.post('/create-catalog', (req, res) => {
  res.send({ message: 'API is working' });
});

router.get('/order', (req, res) => {
  res.send({ message: 'API is working' });
});

module.exports = router;
