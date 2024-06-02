const { connectToDb, closeConnection } = require('../dbConnections/connectToMongoDB');

async function getCollectionData(username, tableName) {
    let db;
    try {
        db = await connectToDb();
        const collection = db.collection(tableName);

        // Check if the collection exists
        const collectionExists = await collection.findOne({ name: tableName, username: username });
        if (!collectionExists) {
            throw new Error(`Collection ${tableName} does not exist for user ${username}`);
        }

        // Fetch and return the data
        return await collection.find({username: username}).toArray();
    } catch (error) {
        console.error(`Failed to get collection data: ${error}`);
        throw error; // re-throw the error to be handled by the calling function
    } finally {
        if (db) {
            await closeConnection();
        }
    }
}

module.exports = { getCollectionData };