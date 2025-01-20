const express = require('express');
const router = express.Router();

router.get('/legalNotice', (req, res) => {
    res.render('landingPage/pages/legalNotice.ejs');
});

module.exports = router;