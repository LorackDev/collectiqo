const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://' +
    process.env.MONGO_DATABASE_USER + ':' +         // USER
    process.env.MONGO_DATABASE_PASSWORD + '@' +     // PASSWORD
    process.env.MONGO_DATABASE_HOST + ':' +         // HOST
    process.env.MONGO_DATABASE_PORT;                // PORT
const dbName = 'clq_collections';
const client = new MongoClient(url);

async function connectToDb() {
    await client.connect();
    console.log("Connected correctly to server");
    return client.db(dbName);
}

async function closeConnection() {
    await client.close();
}

module.exports = { connectToDb, closeConnection };