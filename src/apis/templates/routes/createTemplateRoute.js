const express = require('express');
const multer = require('multer');
const router = express.Router();
const createTemplateController = require('../controllers/createTemplateController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create-template', upload.single('imageUpload'), createTemplateController);

module.exports = router;