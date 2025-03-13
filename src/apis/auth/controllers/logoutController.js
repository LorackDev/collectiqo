const authService = require('../services/logoutService');

const logoutController = async (req, res) => {
    authService.logout(req)
        .then(() => res.status(200).json({ message: 'Logout successful' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = logoutController;
