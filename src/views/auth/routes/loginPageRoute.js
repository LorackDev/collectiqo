const express = require('express');
const router = express.Router();

router.get('/login-page', (req, res) => {
    res.render('pages/login');
});

module.exports = router;