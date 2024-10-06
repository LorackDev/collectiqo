const { connectToDb, closeConnection } = require('../../../utils/mongoUtils');
const { TemplateNotFoundError, DatabaseError } = require('../../../errors/customErrors');

class CreateNewCollectionFromTemplateService {
    async createCollectionFromTemplate(collectionName, templateName, username) {
        let db;
        try {
            db = await connectToDb();
            const templatesCollection = db.collection('templates');

            const template = await templatesCollection.findOne({ name: templateName });

            if (!template) {
                throw new TemplateNotFoundError('Invalid template name');
            }

            const templateCollectionData = {
                collectionName: collectionName,
                columns: template.columns,
                username: username
            };

            let response = await fetch('http://localhost:3005/create-collection', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(templateCollectionData)
            });

            if (!response.ok) throw new Error('Failed to create template collection');

            return { message: 'Collection created successfully from template' };
        } catch (err) {
            throw new DatabaseError('An error occurred while creating collection from template');
        } finally {
            if (db) {
                await closeConnection();
            }
        }
    }
}

module.exports = new CreateNewCollectionFromTemplateService();