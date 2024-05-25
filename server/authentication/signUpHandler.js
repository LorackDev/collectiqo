const bcrypt = require('bcrypt');
const { queryDatabase, handleResults } = require('../dbConnections/connectToMYSQL');

const signupHandler = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        let results = await queryDatabase('SELECT * FROM clq_users WHERE username = ?', [username]);
        let user = handleResults(results, res);

        if (user) {
            res.status(409).json({ message: "User already exists" });
            return;
        }

        results = await queryDatabase('SELECT * FROM clq_users WHERE email = ?', [email]);
        user = handleResults(results, res);

        if (user) {
            res.status(409).json({ message: "Email already in use" });
            return;
        }

        await queryDatabase('INSERT INTO clq_users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = signupHandler;