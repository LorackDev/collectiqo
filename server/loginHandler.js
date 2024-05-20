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
const loginHandler = (req, res) => {
    const { username, password } = req.body;
    const sqlSearch = "SELECT * FROM clq_users WHERE username = ? OR email = ?";
    const search_query = mysql.format(sqlSearch, [username, username]);
    db.query(search_query, async (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length === 0) {
            res.status(401).json({ message: "User not found" });
        } else {
            const user = result[0];
            const match = await bcrypt.compare(password, user.password); // bcrypt will extract the salt from the hashed password and use it to hash the input password for comparison
            if (match) {
                // Passwords match
                res.status(200).json({ message: "Login successful" });
            } else {
                // Passwords don't match
                res.status(401).json({ message: "Incorrect password" });
            }
        }
    });
};

/**
 * Exports the loginHandler function.
 */
module.exports = loginHandler;