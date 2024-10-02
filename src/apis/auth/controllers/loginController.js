const loginService = require('./loginService');

const loginController = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await loginService(username, password);
        req.session.username = user.username;
        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        if (error.message === 'User not found' || error.message === 'Incorrect password') {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An error occurred' });
        }
    }
};

module.exports = loginController;