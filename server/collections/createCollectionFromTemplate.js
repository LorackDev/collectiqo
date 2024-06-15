const { connectToDb, closeConnection } = require('../dbConnections/connectToMongoDB');
const createCollection = require('./createCollection');

const createCollectionFromTemplate = async (req, res) => {

    const { collectionName, templateName } = req.body;

    try {

        const db = await connectToDb();

        const templatesCollection = db.collection('templates');

        const template = await templatesCollection.findOne({ name: templateName });

        if (!template) {
            res.status(400).json({ error: 'Invalid template name' });
            return;
        }

        const templateCollectionData = {
            collectionName: collectionName,
            columns: template.columns
        };

        let body = JSON.stringify(templateCollectionData)

        let response = await fetch('http://localhost:8000/create-collection', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });

        if (!response.ok) throw new Error('Failed to create template collection');

        res.status(200).json({ message: 'Collection created successfully from template' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating collection from template' });
    } finally {
        await closeConnection();
    }
};

module.exports = createCollectionFromTemplate;