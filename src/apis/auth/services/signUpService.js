const bcrypt = require('bcryptjs');
const { queryDatabase, handleResults } = require('../dbConnections/connectToMYSQL');

const signUpService = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    let results = await queryDatabase('SELECT * FROM clq_users WHERE username = ?', [username]);
    let user = handleResults(results);

    if (user) {
        throw new Error('User already exists');
    }

    results = await queryDatabase('SELECT * FROM clq_users WHERE email = ?', [email]);
    user = handleResults(results);

    if (user) {
        throw new Error('Email already in use');
    }

    await queryDatabase('INSERT INTO clq_users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
};

module.exports = signUpService;