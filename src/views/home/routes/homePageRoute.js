const express = require('express');
const router = express.Router();
const requireAuth = require('../../../utils/requireAuth');
const getCollectionNamesController  = require('../../../apis/collections/controllers/getCollectionNamesController');
const axios = require("axios");

router.get('/home-page', async (req, res) => {
    console.log('Session:', req.session);
    if (!req.session.username) {
        return res.redirect('/login-page');
    }
    try {
        const response = await axios.get('https://' + process.env.DOMAIN + ':' + process.env.PORT + '/get-collection-names?username=' + req.session.username);

        console.log('Collection names:', response);
        res.render('home/pages/home', { username: req.session.username, collections: collectionNames });
    } catch (err) {
        console.error(err);
        res.render('home/pages/home', { username: req.session.username, collections: [] });
    }
});

module.exports = router;