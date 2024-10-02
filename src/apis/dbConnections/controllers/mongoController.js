const { connectToDb, closeConnection } = require('../services/mongoService');

const connectController = async (req, res) => {
    try {
        const db = await connectToDb();
        res.status(200).json({ message: "Connected to MongoDB", dbName: db.databaseName });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

const closeController = async (req, res) => {
    try {
        await closeConnection();
        res.status(200).json({ message: "Connection closed" });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = { connectController, closeController };