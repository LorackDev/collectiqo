const { connectToDb, closeConnection } = require('../dbConnections/connectToMongoDB');

const deleteCollectionEntry = async (req, res) => {

    const {collectionName, entryId, username} = req.body;

    try {
        const db = await connectToDb();
        const collection = db.collection('collections');

        const doc = await collection.findOne({ name: collectionName, username: username });

        if (!doc) {
            res.status(400).json({ error: 'Collection does not exist' });
            return;
        }

        doc.entries = doc.entries.filter(entry => entry.id !== entryId);

        const result = await collection.updateOne({ name: collectionName, username: username }, { $set: doc });

        res.status(200).json({ message: 'Entry deleted successfully', result: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the entry' });
    } finally {
        await closeConnection();
    }
}

module.exports = deleteCollectionEntry;