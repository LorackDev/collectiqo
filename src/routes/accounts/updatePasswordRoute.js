const express = require('express');
const router = express.Router();
const updatePasswordController = require('../../apis/accounts/controllers/updatePasswordController');

router.put('/update-password', updatePasswordController);

module.exports = router;