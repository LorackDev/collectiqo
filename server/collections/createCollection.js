const { connectToDb, closeConnection } = require('../dbConnections/connectToMongoDB');

const createCollection = async (req, res) => {

    const { collectionName, columns, username } = req.body;

    if (columns.length > 10) {
        res.status(400).json({ error: 'Cannot add more than 10 columns' });
        return;
    }

    try {
        const db = await connectToDb();

        const collection = db.collection('collections');

        const doc = {
            name: collectionName,
            columns: columns,
            username: username,
            entries: []
        };

        const result = await collection.insertOne(doc);

        res.status(200).json({ message: 'Collection created successfully', result: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the collection' });
    } finally {
        await closeConnection();
    }
}

module.exports = createCollection;