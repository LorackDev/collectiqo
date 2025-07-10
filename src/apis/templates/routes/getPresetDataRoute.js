const express = require('express');
const router = express.Router();
const getPresetDataController = require('../controllers/getPresetDataController');

router.get('/get-preset-data', getPresetDataController);

module.exports = router;