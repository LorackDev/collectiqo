const addCollectionEntryService = require('../services/addCollectionEntryService');
const { sendSuccessResponse } = require('../../utils/responseHandler');

class CreateCollectionEntryController {
    async createCollectionEntry(req, res, next) {
        const { collectionName, entry } = req.body;
        const username = 'Lorack2';

        try {
            const result = await addCollectionEntryService.addCollectionEntry(collectionName, entry, username);
            sendSuccessResponse(res, result, 'Entry added successfully');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CreateCollectionEntryController();