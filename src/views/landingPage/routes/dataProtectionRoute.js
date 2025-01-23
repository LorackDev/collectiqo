const express = require('express');
const router = express.Router();

router.get('/dataProtection', (req, res) => {
    res.render('landingPage/pages/dataProtection.ejs');
});

module.exports = router;