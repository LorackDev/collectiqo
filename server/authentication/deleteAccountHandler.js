const { queryDatabase, handleResults } = require('../dbConnections/connectToMYSQL');

const deleteAccountHandler = async (req, res) => {
    const username = req.session.username;

    try {
        let results = await queryDatabase('SELECT * FROM clq_users WHERE username = ?', [username]);
        let user = handleResults(results, res);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await queryDatabase('DELETE FROM clq_users WHERE username = ?', [username]);

        req.session = null;

        return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = deleteAccountHandler;