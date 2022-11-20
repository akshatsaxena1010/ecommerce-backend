const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');

router.use('/', authController.validateUserInput);

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
