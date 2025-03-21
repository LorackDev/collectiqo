const { connectToDb, closeConnection } = require('../../../utils/mongoUtils');
// const { ValidationError, DatabaseError } = require('../../../errors/customErrors');

const createNewCollectionService = async (collectionName, columns, username) => {
        if (columns.length > 10) {
            // throw new ValidationError('Cannot add more than 10 columns');
        }

        try {
            const db = await connectToDb();
            const collection = db.collection('collections');

            const doc = {
                name: collectionName,
                columns: columns,
                username: username,
                entries: []
            };

            const result = await collection.insertOne(doc);

            return { message: 'Collection created successfully', result: result };
        } catch (err) {
            // throw new DatabaseError('An error occurred while creating the collection');
        } finally {
            await closeConnection();
        }
    }


module.exports = createNewCollectionService;