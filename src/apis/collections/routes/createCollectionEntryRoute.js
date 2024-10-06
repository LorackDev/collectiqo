const express = require('express');
const router = express.Router();
const createCollectionEntryController = require('../controllers/createCollectionEntryController');

router.post('/create-collection-entry', createCollectionEntryController.createCollectionEntry);

module.exports = router;