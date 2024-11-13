const loginService = require('../services/loginService');

// Extract constants for response messages
const LOGIN_SUCCESS_MESSAGE = 'Login successful';
const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

// Extract error handling into a separate function
const handleLoginError = (res, error) => {
    console.error('Login error:', error);
    res.status(500).json({message: INTERNAL_SERVER_ERROR_MESSAGE});
};

const loginController = async (req, res) => {
    const {username, password} = req.body;
    try {
        const loggedInUser = await loginService(username, password);
        req.session.username = loggedInUser.username;
        console.log(`User ${req.session.username} logged in successfully`);
        res.status(200).json({message: LOGIN_SUCCESS_MESSAGE, userId: loggedInUser.id});
    } catch (error) {
        handleLoginError(res, error);
    }
};

module.exports = loginController;