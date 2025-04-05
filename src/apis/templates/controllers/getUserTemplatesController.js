const getUserTemplatesService = require('../services/getUserTemplatesService');

const getUserTemplatesController = async (req, res, next) => {

    try {
        const username = req.session.user.name;
        const response = await getUserTemplatesService(username);
        return res.json(response);
    } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).send('Internal Server Error');
        next(error);
    }
}

module.exports = getUserTemplatesController;