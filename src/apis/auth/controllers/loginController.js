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
        // check if user can be found in database
        const user = await loginService(username, password);
        // throw error if user can't be found
        if(user===undefined){
            throw new Error('User not found')
        }
        // add user data to session variables
        req.session.user = {
            name: user.username,
            id: user.id,
            isLoggedIn: true
        }

        // try to save changes, else throw error
        try {
            await req.session.save();
            console.log(`User ${req.session.user.name} logged in successfully`);
            res.status(200).json({message: LOGIN_SUCCESS_MESSAGE, userId: req.session.user.id});
        } catch (err) {
            console.error('Error saving to session storage: ', err);
            return new Error('Error logging in user');
        }
    } catch (error) {
        handleLoginError(res, error);
    }
};

module.exports = loginController;