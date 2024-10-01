const { connectToDb, closeConnection } = require('../../dbConnections/connectToMongoDB');
const { CollectionNotFoundError, DatabaseError } = require('../../errors/customErrors');

class GetCollectionDataService {
    async getCollectionData(collectionName, username) {
        let db;
        try {
            db = await connectToDb();
            const collection = db.collection('collections');

            const specifiedCollection = await collection.findOne({ name: collectionName, username: username });
            if (!specifiedCollection) {
                throw new CollectionNotFoundError(`Collection ${collectionName} does not exist for user ${username}`);
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
}

module.exports = new GetCollectionDataService();