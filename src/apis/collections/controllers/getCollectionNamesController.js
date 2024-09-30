const getCollectionNamesService = require('../services/getCollectionNamesService');

class GetCollectionNamesController {
    async getCollectionNames(req, res) {
        try {
            const collections = await getCollectionNamesService.getCollectionNames();
            res.status(200).json(collections);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new GetCollectionNamesController();