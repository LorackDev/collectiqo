const { connectToDb, closeConnection } = require('../dbConnections/connectToMongoDB');
const createCollection = require('./createCollection');

async function createCollectionFromTemplate(templateName, username) {
    try {
        const db = await connectToDb();

        const templatesCollection = db.collection('templates');

        const template = await templatesCollection.findOne({ name: templateName });

        if (!template) {
            console.error('Error: Invalid template name');
            return;
        }

        await createCollection(template.name, template.columns, username);
    } catch (err) {
        console.error(err);
    } finally {
        await closeConnection();
    }
}

module.exports = createCollectionFromTemplate;