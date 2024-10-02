const { connectToDb, closeConnection } = require('../../dbConnections/connectToMongoDB');
const { CollectionNotFoundError, DatabaseError } = require('../../errors/customErrors');

class DeleteCollectionService {
    async deleteCollectionEntry(collectionName, entryId, username) {
        try {
            const db = await connectToDb();
            const collection = db.collection('collections');

            const doc = await collection.findOne({ name: collectionName, username: username });

            if (!doc) {
                throw new CollectionNotFoundError('Collection does not exist');
            }

            doc.entries = doc.entries.filter(entry => entry.id !== entryId);

            const result = await collection.updateOne({ name: collectionName, username: username }, { $set: doc });

            return { message: 'Entry deleted successfully', result: result };
        } catch (err) {
            throw new DatabaseError('An error occurred while deleting the entry');
        } finally {
            await closeConnection();
        }
    }
}

module.exports = new DeleteCollectionService();