const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'collections';
const client = new MongoClient(url);

async function addCollectionEntry(collectionName, entry, username) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        const collection = db.collection(collectionName);

        const doc = await collection.findOne({ name: collectionName, username: username });

        doc.entries.push(entry);

        const result = await collection.updateOne({ name: collectionName, username: username }, { $set: doc });
        console.log("Entry added successfully:", result);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

module.exports = addCollectionEntry;