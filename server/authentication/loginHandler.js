const bcrypt = require('bcrypt');
const { queryDatabase, handleResults } = require('../dbConnections/connectToMYSQL');

const loginHandler = async (req, res) => {
    const { username, password } = req.body;

    try {
        const results = await queryDatabase('SELECT * FROM clq_users WHERE username = ? OR email = ?', [username, username]);
        const user = handleResults(results, res);

        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }

        req.session.username = user.username;
        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = loginHandler;
