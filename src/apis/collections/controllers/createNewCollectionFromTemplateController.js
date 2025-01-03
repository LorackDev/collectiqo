const createCollectionFromTemplateService = require('../services/createNewCollectionFromTemplateService');
const { sendSuccessResponse } = require('../../../utils/responseHandler');

const createNewCollectionFromTemplateController = async (req, res, next) => {
        const { collectionName, templateName } = req.body;
        const username = req.session.user.name;

        try {
            const result = await createCollectionFromTemplateService(collectionName, templateName, username);
            sendSuccessResponse(res, result, 'Collection created successfully from template');
        } catch (error) {
            next(error);
        }
    }

module.exports = createNewCollectionFromTemplateController;