const { queryDatabase, handleResults } = require('../../../utils/mysqlUtils');

const updateUsernameService = async (oldUsername, newUsername) => {
    let results = await queryDatabase('SELECT * FROM clq_users WHERE username = ?', [oldUsername]);
    let user = handleResults(results);

    if (!user) {
        throw new Error('User not found');
    }

    results = await queryDatabase('SELECT * FROM clq_users WHERE username = ?', [newUsername]);
    user = handleResults(results);

    if (user) {
        throw new Error('Username already in use');
    }

    await queryDatabase('UPDATE clq_users SET username = ? WHERE username = ?', [newUsername, oldUsername]);

    // Update username in MongoDB collections and templates
    const { connectToDb } = require('../../../utils/mongoUtils');
    const { MongoClient } = require('mongodb');

    const mongoUrl = 'mongodb://' + process.env.MONGO_DATABASE_USER + ':' + process.env.MONGO_DATABASE_PASSWORD + '@' + process.env.MONGO_DATABASE_HOST + ':' + process.env.MONGO_DATABASE_PORT;
    const dbName = 'clq_collections';
    const client = new MongoClient(mongoUrl);

    try {
        await client.connect();
        const db = client.db(dbName);

        await db.collection('collections').updateMany(
            { username: oldUsername },
            { $set: { username: newUsername } }
        );

        await db.collection('templates').updateMany(
            { username: oldUsername },
            { $set: { username: newUsername } }
        );
    } finally {
        await client.close();
    }
};

module.exports = updateUsernameService;