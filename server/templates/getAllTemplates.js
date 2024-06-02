const { MongoClient } = require('mongodb');

const url = 'mongodb://root:password@localhost:27017';
const dbName = 'clq_collections';
const client = new MongoClient(url);

async function getAllTemplates() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        const templatesCollection = db.collection('templates');

        return await templatesCollection.find().toArray();
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

module.exports = { getAllTemplates };