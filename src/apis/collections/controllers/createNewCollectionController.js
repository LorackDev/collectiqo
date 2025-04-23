const createCollectionService = require('../services/createNewCollectionService');
const { sendSuccessResponse } = require('../../../utils/responseHandler');

const createNewCollectionController = async (req, res, next) => {
    const { name, columns, color } = req.body;
    const username = req.session.user.name;

    try {
        const parsedColumns = JSON.parse(columns);
        const imageFile = req.file;
        const imageBuffer = imageFile?.buffer || null;
        const imageType = imageFile?.mimetype || null;

        const result = await createCollectionService(name, parsedColumns, username, imageBuffer, imageType, color);
        sendSuccessResponse(res, result, 'Collection created successfully');
    } catch (error) {
        next(error);
    }
}

module.exports = createNewCollectionController;