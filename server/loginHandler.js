/**
 * Module dependencies.
 */
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const db = require('./dbConnector');

/**
 * The loginHandler function is an Express middleware function that handles user login.
 * It takes a request object, extracts the username and password from the request body,
 * and then queries the database for a user that matches the username or email.
 * If a matching user is found, it compares the provided password with the stored password using bcrypt.
 * If the passwords match, it sends a 200 status code (OK) and a success message.
 * If the passwords do not match, or if no matching user is found, it sends a 401 status code (Unauthorized).
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The parsed HTTP request body.
 * @param {string} req.body.username - The username or email of the user trying to log in.
 * @param {string} req.body.password - The password of the user trying to log in.
 * @param {Object} res - Express response object.
 * @throws Will throw an error if the SQL query fails.
 */
const loginHandler = async (req, res) => {
    const { username, password } = req.body;

    try {
        const results = await db.query('SELECT * FROM clq_users WHERE username = ? OR email = ?', [username, username]);
        if (results.length === 0) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        const user = results[0];
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }

        // Include the user's ID in the response
        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};

/**
 * Exports the loginHandler function.
 */
module.exports = loginHandler;