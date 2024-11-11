const express = require('express');
const router = express.Router();
const deleteCollectionController = require('../controllers/deleteCollectionController');

router.post('/delete-collection', deleteCollectionController);

module.exports = router;