const getCollectionDataService = require('../services/getCollectionDataService');
const { sendSuccessResponse } = require('../../utils/responseHandler');

class GetCollectionDataController {
    async getCollectionData(req, res, next) {
        const collectionName = req.params.collectionName;
        const username = req.session.username;

        try {
            const specifiedCollection = await getCollectionDataService.getCollectionData(collectionName, username);
            res.render('pages/collections', { specifiedCollection, collectionName });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new GetCollectionDataController();