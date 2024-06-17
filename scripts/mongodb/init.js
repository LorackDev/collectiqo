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

async function setDefaultTemplates() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        const templatesCollection = db.collection('templates');

        await Promise.all([
            templatesCollection.insertOne(perfumeTemplate),
            templatesCollection.insertOne(videoGamesTemplate),
            templatesCollection.insertOne(moviesTemplate)
        ]);

        console.log('All templates stored successfully');
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        await client.close();
    }
}

const wineData = {
    name: 'wine',
    username: 'Lorack2',
    columns: ['name', 'origin', 'year', 'price'],
    entries: [
        { name: 'Chardonnay', origin: 'France', year: 2018, price: 20 },
        { name: 'Merlot', origin: 'Italy', year: 2017, price: 25 },
        { name: 'Cabernet Sauvignon', origin: 'USA', year: 2019, price: 30 },
        { name: 'Pinot Noir', origin: 'USA', year: 2018, price: 22 },
        { name: 'Zinfandel', origin: 'USA', year: 2016, price: 15 },
        { name: 'Syrah', origin: 'France', year: 2018, price: 18 },
        { name: 'Sauvignon Blanc', origin: 'France', year: 2020, price: 18 },
        { name: 'Riesling', origin: 'Germany', year: 2019, price: 17 },
        { name: 'Grenache', origin: 'Spain', year: 2017, price: 16 },
        { name: 'Tempranillo', origin: 'Spain', year: 2018, price: 20 }
    ]
};

const carData = {
    name: 'cars',
    username: 'Lorack2',
    columns: ['brand', 'model', 'year', 'price'],
    entries: [
        { brand: 'Toyota', model: 'Corolla', year: 2020, price: 20000 },
        { brand: 'Honda', model: 'Civic', year: 2019, price: 19000 },
        { brand: 'Ford', model: 'Mustang', year: 2021, price: 30000 },
        { brand: 'Chevrolet', model: 'Camaro', year: 2021, price: 25000 },
        { brand: 'BMW', model: '3 Series', year: 2020, price: 40000 },
        { brand: 'Audi', model: 'A4', year: 2021, price: 39000 },
        { brand: 'Mercedes-Benz', model: 'C-Class', year: 2020, price: 41000 },
        { brand: 'Hyundai', model: 'Elantra', year: 2021, price: 20000 },
        { brand: 'Nissan', model: 'Altima', year: 2020, price: 24000 },
        { brand: 'Volkswagen', model: 'Passat', year: 2021, price: 23000 }
    ]
};

const videoGameData = {
    name: 'video games',
    username: 'Lorack2',
    columns: ['title', 'platform', 'releaseYear', 'price'],
    entries: [
        { title: 'The Legend of Zelda: Breath of the Wild', platform: 'Nintendo Switch', releaseYear: 2017, price: 60 },
        { title: 'God of War', platform: 'PlayStation 4', releaseYear: 2018, price: 20 },
        { title: 'Halo Infinite', platform: 'Xbox Series X', releaseYear: 2021, price: 60 },
        { title: 'Super Mario Odyssey', platform: 'Nintendo Switch', releaseYear: 2017, price: 50 },
        { title: 'Red Dead Redemption 2', platform: 'PlayStation 4', releaseYear: 2018, price: 40 },
        { title: 'The Witcher 3: Wild Hunt', platform: 'PC', releaseYear: 2015, price: 30 },
        { title: 'Minecraft', platform: 'PC', releaseYear: 2011, price: 20 },
        { title: 'Overwatch', platform: 'PC', releaseYear: 2016, price: 40 },
        { title: 'Cyberpunk 2077', platform: 'PC', releaseYear: 2020, price: 60 },
        { title: 'The Last of Us Part II', platform: 'PlayStation 4', releaseYear: 2020, price: 60 }
    ]
};

async function addSampleData() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        const collections = db.collection('collections');

        await Promise.all([
            collections.insertOne(wineData),
            collections.insertOne(carData),
            collections.insertOne(videoGameData)
        ]);

        console.log('Sample data added successfully');
    } catch (error) {
        console.error(`Failed to add sample data: ${error}`);
    } finally {
        await client.close();
    }
}

setDefaultTemplates();
addSampleData();
