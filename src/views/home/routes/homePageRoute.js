const express = require('express');
const router = express.Router();
const getCollectionNamesService  = require('../../../apis/collections/services/getCollectionNamesService');

router.get('/home-page', async (req, res) => {
    console.log('Session:', req.session);
    if (!req.session.username) {
        return res.redirect('/login-page');
    }
    try {
        const collections = await getCollectionNamesService(req.session.username);
        console.log('Collection names:', collections);
        res.render('home/pages/home', { username: req.session.username, collections: collections });
    } catch (err) {
        console.error(err);
        res.render('home/pages/home', { username: req.session.username, collections: [] });
    }
});

module.exports = router;