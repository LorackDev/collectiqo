const express = require('express');
const axios = require("axios");
const router = express.Router();
const https = require('https');

// This is only for development purposes. Not very secure :D
const agent = new https.Agent({
    rejectUnauthorized: false
});

// Assuming you have a function or middleware that fetches collection data based on name
router.get('/collection/:collectionName', async (req, res) => {
    const collectionName = req.params.collectionName;
    const username = req.session.user.name;
    try {
        // Await the response from the axios call and extract the data
        const response = await axios.get(
            'https://dev.collectiqo.com:3000/get-collection-data',
            { params: {
                    collectionName: collectionName,
                    username: username
                },
                httpsAgent: agent
            }
        );

        const specifiedCollection = response.data;

        if (!specifiedCollection) {
            return res.status(404).send('Collection not found');
        }

        res.render('collections/pages/collections', { collectionName: collectionName, specifiedCollection: specifiedCollection });

    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
