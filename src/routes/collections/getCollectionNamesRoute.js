const express = require('express');
const router = express.Router();
const getCollectionNamesController = require('../../apis/collections/controllers/getCollectionNamesController');

router.get('/get-collection-names', getCollectionNamesController.getCollectionNames);

module.exports = router;