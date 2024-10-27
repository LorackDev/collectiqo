const bcrypt = require('bcryptjs');
const { queryDatabase, handleResults } = require('../../../utils/mysqlUtils');

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

    return user; // Ensure the user object is returned
};

module.exports = loginService;