const { connectToDb, closeConnection } = require('../../../utils/mongoUtils');
// const { DatabaseError } = require('../../../errors/customErrors');

class GetCollectionNamesService {
    async getCollectionNames(username) {
        let db;
        try {
            db = await connectToDb();

            const collections = await db.listCollections().toArray();
            const collectionNames = [];

            for (const collectionInfo of collections) {
                const collection = db.collection(collectionInfo.name);
                const userCollections = await collection.distinct('name', { username: username });

                collectionNames.push(...userCollections);
            }

            return collectionNames;
        } catch (error) {
            // throw new DatabaseError('An error occurred while retrieving the collection names');
        } finally {
            if (db) {
                await closeConnection();
            }
        }
    }
}

module.exports = new GetCollectionNamesService();