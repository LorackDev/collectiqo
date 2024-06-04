const { connectToDb, closeConnection } = require('../dbConnections/connectToMongoDB');

const createCollection = async (req, res) => {

    const { collectionName, columns, username } = req.body;

    if (columns.length > 10) {
        console.error('Error: Cannot add more than 10 columns');
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
        console.log("Collection created successfully:", result);
    } catch (err) {
        console.error(err);
    } finally {
        await closeConnection();
    }
}

module.exports = createCollection;