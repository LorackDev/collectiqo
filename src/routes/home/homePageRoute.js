const express = require('express');
const router = express.Router();
const getCollectionNamesController  = require('../../apis/collections/controllers/getCollectionNamesController');

router.get('/home-page', async (req, res) => {
    if (!req.session.username) {
        return res.redirect('/login-page');
    }
    try {
        const collectionNames = await getCollectionNamesController.getCollectionNames(req.session.username);
        res.render('pages/home/home', { username: req.session.username, collections: collectionNames });
    } catch (err) {
        console.error(err);
        res.render('pages/home/home', { username: req.session.username, collections: [] });
    }
});

module.exports = router;