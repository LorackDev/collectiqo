const deleteCollectionEntryService = require('../services/deleteCollectionService');
const { sendSuccessResponse } = require('../../../utils/responseHandler');

const deleteCollectionController = async (req, res, next) => {
        const { collectionName, entryId, username } = req.body;

        try {
            const result = await deleteCollectionEntryService(collectionName, entryId, username);
            sendSuccessResponse(res, result, 'Entry deleted successfully');
        } catch (error) {
            next(error);
        }
    }

module.exports = deleteCollectionController;