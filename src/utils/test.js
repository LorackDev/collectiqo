const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
});

const testCreateNewCollection = async () => {
    try {
        const response = await axios.post('https://dev.collectiqo.com:3000/create-new-collection', {
            collectionName: "myCollection",
            columns:["my", "first", "collection"],
            username: "johnDoe"
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            httpsAgent: agent
        });

        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

testCreateNewCollection();