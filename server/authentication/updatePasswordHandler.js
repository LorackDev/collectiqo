const bcrypt = require('bcryptjs');
const { queryDatabase, handleResults } = require('../dbConnections/connectToMYSQL');

const updatePasswordHandler = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const username = req.session.username;

    try {
        let results = await queryDatabase('SELECT * FROM clq_users WHERE username = ?', [username]);
        let user = handleResults(results, res);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatches = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ message: 'Incorrect old password' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await queryDatabase('UPDATE clq_users SET password = ? WHERE username = ?', [hashedNewPassword, username]);

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = updatePasswordHandler;