const express = require('express');
const router = express.Router();
const getCollectionNamesController = require('../controllers/getCollectionNamesController');

router.get('/get-collection-names', getCollectionNamesController.getCollectionNames);

module.exports = router;