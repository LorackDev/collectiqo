const addCollectionEntryService = require('../services/createCollectionEntryService');
const { sendSuccessResponse } = require('../../../utils/responseHandler');

const createCollectionEntryController = async (req, res, next) => {
        const { collectionName, entry } = req.body;
        const username = 'Lorack2';

        try {
            const result = await addCollectionEntryService.createCollectionEntry(collectionName, entry, username);
            sendSuccessResponse(res, result, 'Entry added successfully');
        } catch (error) {
            next(error);
        }
    }

module.exports = createCollectionEntryController;