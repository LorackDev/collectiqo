// src/server/dbConnections/mysqlController.js
const { queryDatabase, handleResults } = require('./mysqlService');

const queryController = async (req, res) => {
    const { query, params } = req.body;

    try {
        const results = await queryDatabase(query, params);
        const handledResults = handleResults(results);
        res.status(200).json({ results: handledResults });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = { queryController };