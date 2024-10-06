const express = require('express');
const router = express.Router();

router.post('/sign-up-page', (req, res) => {
    res.render('pages/signup');
});

module.exports = router;