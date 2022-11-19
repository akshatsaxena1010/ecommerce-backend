const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');

router.use('/', (req, res, next) => {
  if (!req.body || !req.body.name || !req.body.password) {
    res.status(400).send({ status: 'BAD REQUEST', message: 'name and/or password is null.' });
    return;
  }
  next();
});

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

module.exports = router;
