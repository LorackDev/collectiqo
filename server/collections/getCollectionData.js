const { connectToDb, closeConnection } = require('../dbConnections/connectToMongoDB');

const getCollectionData = async (req, res) => {
    const collectionName = req.params.collectionName;
    const username = req.session.username;

    let db;
    try {
        db = await connectToDb();
        const collection = db.collection('collections');

        const specifiedCollection = await collection.findOne({ name: collectionName, username: username });
        if (!specifiedCollection) {
            throw new Error(`Collection ${collectionName} does not exist for user ${username}`);
        }
        res.render('pages/collections', { specifiedCollection, collectionName });
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