const getCollectionNamesService = require('../services/getCollectionNamesService');
const { sendSuccessResponse } = require('../../utils/responseHandler');

class GetCollectionNamesController {
    async getCollectionNames(req, res, next) {
        const username = req.session.username;

        try {
            const collectionNames = await getCollectionNamesService.getCollectionNames(username);
            sendSuccessResponse(res, collectionNames, 'Collection names retrieved successfully');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new GetCollectionNamesController();