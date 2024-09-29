const Collection = require('../models/collection');

class CollectionService {
    async createCollection(name) {
        const collection = new Collection({ name });
        await collection.save();
        return collection;
    }

    async getCollections() {
        return Collection.find().populate('items');
    }

    async addItemToCollection(collectionId, itemId) {
        const collection = await Collection.findById(collectionId);
        collection.items.push(itemId);
        await collection.save();
        return collection;
    }
}

module.exports = new CollectionService();