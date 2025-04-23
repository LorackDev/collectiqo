const { connectToDb, closeConnection } = require('../../../utils/mongoUtils');

const getPresetDataService = async(preset) => {
    let db;
    try {
        db = await connectToDb();
        const templatesCollection = db.collection('templates');

        if (typeof preset !== 'string') {
            throw new Error('Invalid preset value');
        }
        const template = await templatesCollection.findOne({ name: { $eq: preset } });

        if (template) {
            return template;
        } else {
            console.warn('No template found for preset:', preset);
            return {};
        }
    } catch (error) {
        console.error('Error fetching preset data:', error);
        return {};
    } finally {
        if (db) {
            await closeConnection();
        }
    }
}

module.exports = getPresetDataService;