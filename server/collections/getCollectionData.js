const { connectToDb, closeConnection } = require('../dbConnections/connectToMongoDB');

const getCollectionData = async (req, res) => {
    const collectionName = req.params.collectionName;
    const username = req.session.username;

    let db;
    try {
        db = await connectToDb();
        const collection = db.collection('collections');

        const collectionExists = await collection.findOne({ name: collectionName, username: username });
        if (!collectionExists) {
            throw new Error(`Collection ${collectionName} does not exist for user ${username}`);
        }
        const collections = await collection.find({ username: username }).toArray();

        res.render('pages/collections', { collections, collectionName });
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