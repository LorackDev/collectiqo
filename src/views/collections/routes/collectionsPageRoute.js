const express = require('express');
const router = express.Router();

router.get('/collections-page', (req, res) => {
    res.render('../pages/collections');
});

module.exports = router;