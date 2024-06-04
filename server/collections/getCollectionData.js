const { connectToDb, closeConnection } = require('../dbConnections/connectToMongoDB');

const getCollectionData = async (req, res) => {

    const {username, tableName} = req.body;

    let db;
    try {
        db = await connectToDb();
        const collection = db.collection(tableName);

        // Check if the collection exists
        const collectionExists = await collection.findOne({ name: tableName, username: username });
        if (!collectionExists) {
            throw new Error(`Collection ${tableName} does not exist for user ${username}`);
        }

        const data = await collection.find({username: username}).toArray();

        res.json(data);
    } catch (error) {
        console.error(`Failed to get collection data: ${error}`);

        res.status(500).json({ error: error.toString() });
    } finally {
        if (db) {
            await closeConnection();
        }
    }
}

module.exports = getCollectionData;