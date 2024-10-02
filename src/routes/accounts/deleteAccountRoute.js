const express = require('express');
const router = express.Router();
const deleteAccountController = require('../../apis/accounts/controllers/deleteAccountController');

router.delete('/delete-account', deleteAccountController);

module.exports = router;