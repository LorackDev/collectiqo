const express = require('express');
const router = express.Router();
const updatePasswordController = require('../controllers/updatePasswordController');

router.put('/update-password', updatePasswordController);

module.exports = router;