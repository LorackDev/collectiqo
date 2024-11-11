const createCollectionService = require('../services/createNewCollectionService');
const { sendSuccessResponse } = require('../../../utils/responseHandler');

const createNewCollectionController = async (req, res, next) => {
        const { collectionName, columns, username } = req.body;

        try {
            const result = await createCollectionService.createCollection(collectionName, columns, username);
            sendSuccessResponse(res, result, 'Collection created successfully');
        } catch (error) {
            next(error);
        }
    }

module.exports = createNewCollectionController;