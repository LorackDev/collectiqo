const dotenv = require("dotenv");
dotenv.config({ path: '../../.env' });


const createCollection = require('../../server/collections/createCollection');
const createCollectionFromTemplate = require('../../server/collections/createCollectionFromTemplate');
const addCollectionEntry = require('../../server/collections/addCollectionEntry');
const {connectToDb, closeConnection} = require("../../server/dbConnections/connectToMongoDB");


const wineData = [
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
];

const carData = [
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
];

const videoGameData = [
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
];

async function addSampleData() {
    try {

        const db = await connectToDb();

        await createCollection('wine', ['name', 'origin', 'year', 'price'], 'User1');
        await createCollection('cars', ['brand', 'model', 'year', 'price'], 'User2');

        for (const entry of wineData) {
            await addCollectionEntry('wine', entry, 'User1');
        }

        for (const entry of carData) {
            await addCollectionEntry('cars', entry, 'User2');
        }

        await createCollectionFromTemplate('video games', 'User3');

        for (const entry of videoGameData) {
            await addCollectionEntry('video games', entry, 'User3', );
        }

        console.log('Sample data added successfully');
    } catch (error) {
        console.error(`Failed to add sample data: ${error}`);
    } finally {
        await closeConnection();
    }
}

addSampleData();