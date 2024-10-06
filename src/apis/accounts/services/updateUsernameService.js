const { queryDatabase, handleResults } = require('../../../utils/mysqlUtils');

const updateUsernameService = async (oldUsername, newUsername) => {
    let results = await queryDatabase('SELECT * FROM clq_users WHERE username = ?', [oldUsername]);
    let user = handleResults(results);

    if (!user) {
        throw new Error('User not found');
    }

    results = await queryDatabase('SELECT * FROM clq_users WHERE username = ?', [newUsername]);
    user = handleResults(results);

    if (user) {
        throw new Error('Username already in use');
    }

    await queryDatabase('UPDATE clq_users SET username = ? WHERE username = ?', [newUsername, oldUsername]);
};

module.exports = updateUsernameService;