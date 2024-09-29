const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://root:password@localhost:27017';
const dbName = 'clq_collections';
const client = new MongoClient(url);

async function storeTemplate(template) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        const templatesCollection = db.collection('templates');

        const result = await templatesCollection.insertOne(template);
        console.log("Template stored successfully:", result);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

module.exports = { storeTemplate };