const createTemplateService= require('../services/createTemplateService');

const createTemplateController = async (req, res, next) => {

    const { name, columns, color } = req.body;
    const username = req.session.user.name;

    const imageFile = req.file;
    const imageBuffer = imageFile?.buffer || null;
    const imageType = imageFile?.mimetype || null;

    const templateData = {
        name,
        columns,
        owner: username,
        color,
        imageBuffer,
        imageType
    }

    try {
        const response = await createTemplateService(templateData);

        return res.json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = createTemplateController;