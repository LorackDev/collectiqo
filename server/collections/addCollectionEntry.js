const { connectToDb, closeConnection } = require('../dbConnections/connectToMongoDB');

async function addCollectionEntry(collectionName, entry, username) {
    try {
        const db = await connectToDb();
        const collection = db.collection(collectionName);

        const doc = await collection.findOne({ name: collectionName, username: username });

        if (!doc) {
            console.error('Error: Collection does not exist');
            return;
        }

        doc.entries.push(entry);

        const result = await collection.updateOne({ name: collectionName, username: username }, { $set: doc });
        console.log("Entry added successfully:", result);
    } catch (err) {
        console.error(err);
    } finally {
        await closeConnection();
    }
}

module.exports = addCollectionEntry;