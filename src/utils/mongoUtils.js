const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://' +
    process.env.MONGO_DATABASE_USER + ':' +         // USER
    process.env.MONGO_DATABASE_PASSWORD + '@' +     // PASSWORD
    process.env.MONGO_DATABASE_HOST + ':' +         // HOST
    process.env.MONGO_DATABASE_PORT;                // PORT
const dbName = 'clq_collections';
let client;

const connectToDb = async() => {
    if (!client) {
        client = new MongoClient(url);
        await client.connect();
        console.log("Connected correctly to server");
    }
    return client.db(dbName);
}

// Remove closeConnection or handle it at application shutdown
const closeConnection = async() => {
    if (client) {
        await client.close();
        client = null;
    }
}

module.exports = { connectToDb, closeConnection };
