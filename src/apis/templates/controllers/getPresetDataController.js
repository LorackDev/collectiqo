const getPresetDataService = require('../services/getPresetDataService');

const getPresetDataController = async (req, res, next) => {

    const templateName = req.query.templateName;

    try {
        const response = await getPresetDataService(templateName );

        return res.json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = getPresetDataController;