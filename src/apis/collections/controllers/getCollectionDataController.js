const getCollectionDataService = require('../services/getCollectionDataService');
const { sendSuccessResponse } = require('../../../utils/responseHandler');

const getCollectionDataController = async (req, res, next) => {
        const collectionName = req.query.collectionName;
        const username = req.query.username;

        try {
            const response = await getCollectionDataService(collectionName, username);

            return res.json(response);
        } catch (error) {
            next(error);
        }
    }

module.exports = getCollectionDataController;