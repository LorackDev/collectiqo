const createTemplateService= require('../services/createTemplateService');

const createTemplateController = async (req, res, next) => {

    const { name, columns } = req.body;
    const username = req.session.user.name;

    const templateData = {
        name,
        columns,
        owner: username
    }

    try {
        const response = await createTemplateService(templateData);

        return res.json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = createTemplateController;