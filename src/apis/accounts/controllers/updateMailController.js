const updateMailService = require('../services/updateMailService');

const updateMailController = async (req, res) => {
    const username = req.session.user.name;
    const newEmail = req.body.email;

    try {
        await updateMailService(username, newEmail);
        return res.status(200).json({ message: "Mail updated successfully" });
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An error occurred' });
        }
    }
};

module.exports = updateMailController;