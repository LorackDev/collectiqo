const express = require('express');
const router = express.Router();

router.get('/login-page', (req, res) => {
    res.render('auth/pages/login.ejs');
});

module.exports = router;