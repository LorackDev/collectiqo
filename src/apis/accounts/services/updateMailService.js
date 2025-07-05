const { queryDatabase, handleResults } = require('../../../utils/mysqlUtils');

const updateMailService = async (username, newEmail) => {
    console.log("Trying to update mail for user:", username, "with mail ", newEmail);
    let results = await queryDatabase('SELECT * FROM clq_users WHERE username = ?', [username]);
    let user = handleResults(results);

    if (!user) {
        throw new Error('User not found');
    }

    await queryDatabase('UPDATE clq_users SET email = ? WHERE username = ?', [newEmail, username]);
};

module.exports = updateMailService;