const express = require('express');
const router = express.Router();
const createCollectionController = require('../controllers/createNewCollectionController');

router.post('/create-new-collection', createCollectionController.createCollection);

module.exports = router;