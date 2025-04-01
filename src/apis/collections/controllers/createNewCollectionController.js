const createCollectionService = require('../services/createNewCollectionService');
const { sendSuccessResponse } = require('../../../utils/responseHandler');

const createNewCollectionController = async (req, res, next) => {
        const { name, columns } = req.body;
        const username = req.session.user.name;

        try {
            const result = await createCollectionService(name, columns, username);
            sendSuccessResponse(res, result, 'Collection created successfully');
        } catch (error) {
            next(error);
        }
    }

module.exports = createNewCollectionController;