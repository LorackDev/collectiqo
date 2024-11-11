const { connectToDb, closeConnection } = require('../../../utils/mongoUtils');
//const { CollectionNotFoundError, DatabaseError } = require('../../../errors/customErrors');

const getCollectionDataService = async(collectionName, username) => {
        let db;
        try {
            db = await connectToDb();
            const collection = db.collection('collections');

            const specifiedCollection = await collection.findOne({ name: collectionName, username: username });
            if (!specifiedCollection) {
                //throw new CollectionNotFoundError(`Collection ${collectionName} does not exist for user ${username}`);
            }
            return specifiedCollection;
        } catch (err) {
            throw new DatabaseError('An error occurred while retrieving the collection data');
        } finally {
            if (db) {
                await closeConnection();
            }
        }
    }

module.exports = getCollectionDataService;