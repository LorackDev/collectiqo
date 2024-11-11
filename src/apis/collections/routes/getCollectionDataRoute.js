const express = require('express');
const router = express.Router();
const getCollectionDataController = require('../controllers/getCollectionDataController');

router.get('/get-collection-data', getCollectionDataController);

module.exports = router;