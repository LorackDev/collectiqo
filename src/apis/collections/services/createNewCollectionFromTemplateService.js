const { connectToDb, closeConnection } = require('../../../utils/mongoUtils');
const axios = require('axios');
const https = require('https');
const BASE_URL = 'https://' + process.env.DOMAIN + ':' + process.env.PORT;
const createNewCollectionService = require('./createNewCollectionService');

const agent = new https.Agent({
    rejectUnauthorized: false
});

const createNewCollectionFromTemplateService = async (collectionName, templateName, username) => {
    let db;
    try {
        db = await connectToDb();
        const templatesCollection = db.collection('templates');

        const template = await templatesCollection.findOne({ name: templateName });

        if (!template) {
            throw new Error('Invalid template name');
        }

        await createNewCollectionService(collectionName, template.columns, username);

        return { message: 'Collection created successfully from template' };
    } catch (err) {
        console.error('Error creating collection from template:', err);
    } finally {
        if (db) {
            await closeConnection();
        }
    }
}

module.exports = createNewCollectionFromTemplateService;