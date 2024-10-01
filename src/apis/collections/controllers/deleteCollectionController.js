const deleteCollectionEntryService = require('../services/deleteCollectionEntryService');
const { sendSuccessResponse } = require('../../../utils/responseHandler');

class DeleteCollectionController {
    async deleteCollection(req, res, next) {
        const { collectionName, entryId, username } = req.body;

        try {
            const result = await deleteCollectionEntryService.deleteCollectionEntry(collectionName, entryId, username);
            sendSuccessResponse(res, result, 'Entry deleted successfully');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new DeleteCollectionController();