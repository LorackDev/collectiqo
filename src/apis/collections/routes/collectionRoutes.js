const express = require('express');
const collectionController = require('../controllers/collectionController');

const router = express.Router();

router.post('/add-collection-entry', collectionController.addCollectionEntry);
router.post('/create-collection', collectionController.createCollection);
router.post('/delete-collection-entry', collectionController.deleteCollectionEntry);
router.get('/get-collection-data', collectionController.getCollectionData);
router.get('/get-collection-names', collectionController.getCollectionNames);

module.exports = router;