const express = require('express');
const router = express.Router();

router.get('/account-settings', (req, res) => {
    res.render('pages/account-settings');
});

module.exports = router;