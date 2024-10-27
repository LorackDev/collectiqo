// src/apis/auth/controllers/loginController.js
const loginService = require('../services/loginService');

const loginController = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await loginService(username, password);
        console.log('Authenticated user:', user); // Debugging line
        req.session.username = user.username;
        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        console.error('Login error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = loginController;