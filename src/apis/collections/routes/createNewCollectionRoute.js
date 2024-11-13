const express = require('express');
const router = express.Router();
const createNewCollectionController = require('../controllers/createNewCollectionController');

router.post('/create-new-collection', createNewCollectionController);

module.exports = router;