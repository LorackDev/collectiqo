const express = require('express');
const router = express.Router();
const multer = require('multer');
const createNewCollectionController = require('../controllers/createNewCollectionController');

// Use memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Apply the upload middleware for handling 'imageUpload' field
router.post('/create-new-collection', upload.single('imageUpload'), createNewCollectionController);

module.exports = router;