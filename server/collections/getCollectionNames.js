const { connectToDb, closeConnection } = require('../dbConnections/connectToMongoDB');

const getCollectionNames = async (username) => {
    let db;
    try {
        db = await connectToDb();

        // Get the list of all collections in the database
        const collections = await db.listCollections().toArray();
        const collectionNames = [];

        // Iterate through all collections and find the ones belonging to the user
        for (const collectionInfo of collections) {
            const collection = db.collection(collectionInfo.name);
            const userCollections = await collection.distinct('name', { username: username });

            collectionNames.push(...userCollections);
        }

        return collectionNames;
    } catch (error) {
        console.error(`Failed to get collection names: ${error}`);
        throw error;
    } finally {
        if (db) {
            await closeConnection();
        }
    }
}

module.exports = getCollectionNames;
