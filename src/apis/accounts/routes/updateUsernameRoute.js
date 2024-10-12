const express = require('express');
const router = express.Router();
const updateUsernameController = require('../controllers/updateUsernameController');

router.post('/update-username', updateUsernameController);

module.exports = router;