/**
 * Module dependencies.
 */
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const db = require('./dbConnection');

/**
 * The signupHandler function is an Express middleware function that handles user registration.
 * It takes a request object, extracts the username, email, and password from the request body,
 * hashes the password using bcrypt, and then inserts the new user into the database.
 * If a user with the same username already exists, it sends a 409 status code (Conflict).
 * If the user is successfully created, it sends a 201 status code (Created).
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The parsed HTTP request body.
 * @param {string} req.body.username - The username of the new user.
 * @param {string} req.body.email - The email of the new user.
 * @param {string} req.body.password - The password of the new user.
 * @param {Object} res - Express response object.
 * @throws Will throw an error if the SQL query fails.
 */
const signupHandler = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
    const sqlSearch = "SELECT * FROM clq_users WHERE username = ?";
    const search_query = mysql.format(sqlSearch, [username]);
    const sqlInsert = "INSERT INTO clq_users (username, email, password) VALUES (?, ?, ?)";
    const insert_query = mysql.format(sqlInsert, [username, email, hashedPassword]);

    db.query(search_query, async (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length !== 0) {
            res.status(409).json({ message: "User already exists" });
        } else {
            db.query(insert_query, (err, result) => {
                if (err) {
                    throw err;
                }
                res.status(201).json({ message: "User created successfully" });
            });
        }
    });
};

/**
 * Exports the signupHandler function.
 */
module.exports = signupHandler;