const { connectToDb, closeConnection } = require('../dbConnections/connectToMongoDB');
const { createCollection } = require('./createCollection');

const createCollectionFromTemplate = async (req, res) => {

    const { templateName, username } = req.body;

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
};

module.exports = createCollectionFromTemplate;