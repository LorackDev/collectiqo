const express = require('express');
const router = express.Router();

router.get('/account-settings', (req, res) => {
    res.render('accounts/pages/account-settings');
});

module.exports = router;