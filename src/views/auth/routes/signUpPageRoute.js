const express = require('express');
const router = express.Router();

router.get('/sign-up-page', (req, res) => {
    res.render('auth/pages/sign-up');
});

module.exports = router;