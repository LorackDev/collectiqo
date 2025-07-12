const express = require('express');
const router = express.Router();
const getUserTemplatesController = require('../controllers/getUserTemplatesController');

router.get('/get-user-templates', getUserTemplatesController);

module.exports = router;