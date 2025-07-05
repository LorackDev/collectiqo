const { connectToDb, closeConnection } = require('../../../utils/mongoUtils');
// const { CollectionNotFoundError, DatabaseError } = require('../../../errors/customErrors');

const createCollectionEntryService = async (collectionName, entry, username) => {
    try {

        const db = await connectToDb();
        const collection = db.collection('collections');

        console.log("Trying to update collection with name:", collectionName, "and username:", username);
        console.log("Entries being saved:", entry);

        const result = await collection.updateOne(
            { name: collectionName, username: username },
            { $set: { entries: entry } },
            { upsert: true } // 👈 creates the document if it doesn't exist
        );

        console.log("MongoDB update result:", result);

        return { message: 'Entries overwritten successfully', result: result };
    } catch (err) {
        // throw new DatabaseError('An error occurred while overwriting the entries');
    } finally {
        await closeConnection();
    }
}

module.exports = createCollectionEntryService;