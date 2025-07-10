const {connectToDb} = require("../../../utils/mongoUtils");

const getUserTemplatesServices = async(username) => {
    try {

        const db = await connectToDb();
        const templatesCollection = db.collection('templates');

        const templates = await templatesCollection.find({ $or: [ { owner: username }, { owner: 'GLOBAL' } ] }).project({ name: 1 }).toArray();
        return templates.map(template => template.name);

    } catch (error) {
        console.error('Error fetching templates:', error);
        throw new Error('Internal Server Error');
    }
};

module.exports = getUserTemplatesServices;