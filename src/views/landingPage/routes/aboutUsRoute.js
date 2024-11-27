const express = require('express');
const router = express.Router();

router.get('/aboutUs', (req, res) => {
    res.render('landingPage/pages/about.ejs');
});

module.exports = router;