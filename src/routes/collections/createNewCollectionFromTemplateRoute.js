const express = require('express');
const router = express.Router();
const createCollectionFromTemplateController = require('../../apis/collections/controllers/createNewCollectionFromTemplateController');

router.post('/create-new-collection-from-template', createCollectionFromTemplateController.createCollectionFromTemplate, (req, res) => {
    res.redirect('/views/pages/accounts/accountSettings');
});

module.exports = router;