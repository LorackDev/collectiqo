const deleteCollectionEntryService = require('../services/deleteCollectionEntryService');

class DeleteCollectionEntryController {
    async deleteCollectionEntry(req, res) {
        try {
            const { collectionId, itemId } = req.body;
            const collection = await deleteCollectionEntryService.deleteCollectionEntry(collectionId, itemId);
            res.status(200).json(collection);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new DeleteCollectionEntryController();