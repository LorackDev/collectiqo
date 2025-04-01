const { connectToDb, closeConnection } = require('../../../utils/mongoUtils');

const createNewCollectionService = async (name, columns, username) => {

        try {
            const db = await connectToDb();
            const collection = db.collection('collections');

            const doc = {
                name: name,
                columns: columns,
                username: username,
                entries: []
            };

            const result = await collection.insertOne(doc);

            return { message: 'Collection created successfully', result: result };
        } catch (err) {
            throw new Error('An error occurred while creating the collection');
        }
    }


module.exports = createNewCollectionService;