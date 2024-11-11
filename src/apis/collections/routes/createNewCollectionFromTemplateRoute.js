const express = require('express');
const router = express.Router();
const createCollectionFromTemplateController = require('../controllers/createNewCollectionFromTemplateController');

router.post('/create-new-collection-from-template', createCollectionFromTemplateController, (req, res) => {
    res.redirect('/views/pages/accounts/accountSettings');
});

module.exports = router;