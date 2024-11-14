const getCollectionNamesService = require('../services/getCollectionNamesService');
const { sendSuccessResponse } = require('../../../utils/responseHandler');

const getCollectionNamesController = async (username, res, next) => {

    try {
            const collectionNames = await getCollectionNamesService(username);
            sendSuccessResponse(res, collectionNames, 'Collection names retrieved successfully');
            return collectionNames;
        } catch (error) {
            console.log(error);
        }
};

module.exports = getCollectionNamesController;