const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://root:password@localhost:27017';
const dbName = 'clq_collections';
const client = new MongoClient(url);

const perfumeTemplate = {
    name: 'perfume',
    columns: ['brand', 'name', 'prodYear', 'obtained', 'value', 'size', 'smell']
};

const videoGamesTemplate = {
    name: 'video games',
    columns: ['title', 'platform', 'releaseYear', 'price']
};

const moviesTemplate = {
    name: 'movies',
    columns: ['title', 'director', 'genre', 'releaseYear']
};

function setDefaultTemplates() {
    Promise.all([
        storeTemplate(perfumeTemplate),
        storeTemplate(videoGamesTemplate),
        storeTemplate(moviesTemplate)
    ]).then(() => {
        console.log('All templates stored successfully');
    }).catch((err) => {
        console.error('An error occurred:', err);
    });
}

setDefaultTemplates();

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