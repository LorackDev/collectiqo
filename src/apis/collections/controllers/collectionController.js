const collectionService = require('../services/');

class CollectionController {

    async addCollectionEntry(req, res) {
        try {
            const { collectionId, itemId } = req.body;
            const collection = await collectionService.addCollectionEntry(collectionId, itemId);
            res.status(200).json(collection);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createCollection(req, res) {
        try {
            const { name } = req.body;
            const collection = await collectionService.createCollection(name);
            res.status(201).json(collection);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteCollectionEntry(req, res) {
        try {
            const { collectionId, itemId } = req.body;
            const collection = await collectionService.deleteCollectionEntry(collectionId, itemId);
            res.status(200).json(collection);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getCollectionData(req, res) {
        try {
            const collections = await collectionService.getCollectionData();
            res.status(200).json(collections);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async addItemToCollection(req, res) {
        try {
            const { collectionId, itemId } = req.body;
            const collection = await collectionService.addItemToCollection(collectionId, itemId);
            res.status(200).json(collection);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new CollectionController();