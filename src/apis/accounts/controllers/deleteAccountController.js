const deleteAccountService = require('../services/deleteAccountService');

const deleteAccountController = async (req, res) => {
    const username = req.session.user.name;

    try {
        await deleteAccountService(username);
        req.session = null;
        return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An error occurred' });
        }
    }
};

module.exports = deleteAccountController;