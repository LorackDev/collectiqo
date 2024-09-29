const createCollectionService = require('../services/createCollectionService');

class CreateCollectionController {
    async createCollection(req, res) {
        try {
            const { name } = req.body;
            const collection = await createCollectionService.createCollection(name);
            res.status(201).json(collection);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new CreateCollectionController();