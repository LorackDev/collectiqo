const updateUsernameService = require('../services/updateUsernameService');

const updateUsernameController = async (req, res) => {
    const { newUsername } = req.body;
    const oldUsername = req.session.username;

    try {
        await updateUsernameService(oldUsername, newUsername);
        req.session.username = newUsername;
        return res.status(200).json({ message: "Username updated successfully" });
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: error.message });
        } else if (error.message === 'Username already in use') {
            return res.status(409).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An error occurred' });
        }
    }
};

module.exports = updateUsernameController;