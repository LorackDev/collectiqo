const updatePasswordService = require('../services/updatePasswordService');

const updatePasswordController = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const username = req.session.user.name;

    try {
        await updatePasswordService(username, oldPassword, newPassword);
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: error.message });
        } else if (error.message === 'Incorrect old password') {
            return res.status(401).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An error occurred' });
        }
    }
};

module.exports = updatePasswordController;