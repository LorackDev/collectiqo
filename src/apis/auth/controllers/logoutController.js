const logOutService = require('../services/logOutService');

const logOutController = async (req, res) => {

    try {
        await logOutService();
        return res.status(201).json({ message: "Logged out successfully" });

    } catch (error) {
        if (error.message === 'User already exists' || error.message === 'Email already in use') {
            return res.status(409).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An error occurred' });
        }
    }
};

module.exports = logOutController;