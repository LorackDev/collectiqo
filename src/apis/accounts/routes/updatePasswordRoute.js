const express = require('express');
const router = express.Router();
const updatePasswordController = require('../controllers/updatePasswordController');

router.post('/update-password', updatePasswordController);

module.exports = router;