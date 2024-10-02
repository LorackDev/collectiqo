const bcrypt = require('bcryptjs');
const { queryDatabase, handleResults } = require('../dbConnections/connectToMYSQL');

const loginService = async (username, password) => {
    const results = await queryDatabase('SELECT * FROM clq_users WHERE username = ? OR email = ?', [username, username]);
    const user = handleResults(results);

    if (!user) {
        throw new Error('User not found');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
        throw new Error('Incorrect password');
    }

    return user;
};

module.exports = loginService;