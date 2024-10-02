const createCollectionFromTemplateService = require('../services/createNewCollectionFromTemplateService');
const { sendSuccessResponse } = require('../../../utils/responseHandler');

class CreateNewCollectionFromTemplateController {
    async createCollectionFromTemplate(req, res, next) {
        const { collectionName, templateName } = req.body;
        const username = req.session.username;

        try {
            const result = await createCollectionFromTemplateService.createCollectionFromTemplate(collectionName, templateName, username);
            sendSuccessResponse(res, result, 'Collection created successfully from template');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CreateNewCollectionFromTemplateController();