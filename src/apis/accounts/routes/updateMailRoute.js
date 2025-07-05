const express = require('express');
const router = express.Router();
const updateMailController = require('../controllers/updateMailController');

router.post('/update-mail', updateMailController);

module.exports = router;