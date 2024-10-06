const bcrypt = require('bcryptjs');
const { queryDatabase, handleResults } = require('../../../utils/mysqlUtils');

const updatePasswordService = async (username, oldPassword, newPassword) => {
    let results = await queryDatabase('SELECT * FROM clq_users WHERE username = ?', [username]);
    let user = handleResults(results);

    if (!user) {
        throw new Error('User not found');
    }

    const passwordMatches = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatches) {
        throw new Error('Incorrect old password');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await queryDatabase('UPDATE clq_users SET password = ? WHERE username = ?', [hashedNewPassword, username]);
};

module.exports = updatePasswordService;