const { queryDatabase, handleResults } = require('../dbConnections/connectToMYSQL');

const updateUsernameHandler = async (req, res) => {
    const { newUsername } = req.body;
    const oldUsername = req.session.username; // Assuming session management is in place

    try {
        let results = await queryDatabase('SELECT * FROM clq_users WHERE username = ?', [oldUsername]);
        let user = handleResults(results, res);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        results = await queryDatabase('SELECT * FROM clq_users WHERE username = ?', [newUsername]);
        user = handleResults(results, res);

        if (user) {
            return res.status(409).json({ message: "Username already in use" });
        }

        await queryDatabase('UPDATE clq_users SET username = ? WHERE username = ?', [newUsername, oldUsername]);

        // Update the username in the session
        req.session.username = newUsername;

        return res.status(200).json({ message: "Username updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = updateUsernameHandler;