const express = require('express');
const router = express.Router();
const getCollectionDataController = require('../controllers/getCollectionDataController');

router.get('/get-collection-data', getCollectionDataController.getCollectionData);

module.exports = router;