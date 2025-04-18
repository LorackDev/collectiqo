const {MongoClient} = require("mongodb");

const url = 'mongodb://'+ process.env.MONGO_DATABASE_USER + ':' + process.env.MONGO_DATABASE_PASSWORD + '@' + process.env.MONGO_DATABASE_HOST + ':' + process.env.MONGO_DATABASE_PORT;
const dbName = 'clq_collections';
const client = new MongoClient(url);

const createTemplateService = async(templateData) => {

    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        const templatesCollection = db.collection('templates');

        await Promise.all([
            templatesCollection.insertOne(templateData),
        ]);

        console.log('All templates stored successfully');
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        await client.close();
    }
}

module.exports = createTemplateService;
