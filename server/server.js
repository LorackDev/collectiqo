// server.js
const express = require('express');
const extractData = require('./dbExtractor');
const app = express();

app.get('/api/data/:tableName', async (req, res) => {
    try {
        const data = await extractData(req.params.tableName);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});