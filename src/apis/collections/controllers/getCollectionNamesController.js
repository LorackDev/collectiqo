const getCollectionNamesService = require('../services/getCollectionNamesService');
const { sendSuccessResponse } = require('../../../utils/responseHandler');

const getCollectionNamesController = async (req, res, next) => {
        const username = req.session.username;

        try {
            const collectionNames = await getCollectionNamesService(username);
            sendSuccessResponse(res, collectionNames, 'Collection names retrieved successfully');
        } catch (error) {
            next(error);
        }
};

module.exports = getCollectionNamesController;