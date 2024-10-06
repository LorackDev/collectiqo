const express = require('express');
const router = express.Router();
const loginController = require('../../../server/authentication/loginController');

router.post('/login', loginController);

module.exports = router;