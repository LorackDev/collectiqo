const getCollectionDataService = require('../services/getCollectionDataService');
const { sendSuccessResponse } = require('../../../utils/responseHandler');

const getCollectionDataController = async (req, res, next) => {
        const collectionName = req.query.collectionName;
        const username = req.session.username;

        try {
            const specifiedCollection = await getCollectionDataService(collectionName, username);
            res.render('pages/collections', { specifiedCollection, collectionName });
        } catch (error) {
            next(error);
        }
    }

module.exports = getCollectionDataController;