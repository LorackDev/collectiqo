const express = require('express');
const router = express.Router();
const getCollectionNamesController = require('../controllers/getCollectionNamesController');

router.get('/get-collection-names', getCollectionNamesController);

module.exports = router;