const signUpService = require('../services/signUpService');

const signUpController = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await signUpService(username, email, password);
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        if (error.message === 'User already exists' || error.message === 'Email already in use') {
            return res.status(409).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An error occurred' });
        }
    }
};

module.exports = signUpController;