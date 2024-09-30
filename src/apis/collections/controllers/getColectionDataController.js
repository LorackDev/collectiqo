const getColelctionDataService = require('../services/getColectionDataService');

class GetCollectionDataController {
    async getCollectionData(req, res) {
        try {
            const collections = await getCollectionDataService.getCollectionData();
            res.status(200).json(collections);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new GetCollectionDataController();