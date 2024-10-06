const { queryDatabase, handleResults } = require('../../../utils/mysqlUtils');

const deleteAccountService = async (username) => {
    let results = await queryDatabase('SELECT * FROM clq_users WHERE username = ?', [username]);
    let user = handleResults(results);

    if (!user) {
        throw new Error('User not found');
    }

    await queryDatabase('DELETE FROM clq_users WHERE username = ?', [username]);
};

module.exports = deleteAccountService;