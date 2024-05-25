// connectToMYSQL.js

const mysql = require('mysql2');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '../.env.test' });
} else {
    dotenv.config({ path: '../.env' });
}

const db = mysql.createConnection({
    host: process.env.MYSQL_DATABASE_HOST,
    port: process.env.MYSQL_DATABASE_PORT,
    user: process.env.MYSQL_DATABASE_USER,
    password: process.env.MYSQL_DATABASE_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})

async function queryDatabase(query, params) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function handleResults(results, res) {
    if (results.length === 0) {
        res.status(401).json({ message: 'User not found' });
        return false;
    }

    const user = results[0];
    return user;
}

module.exports = { db, queryDatabase, handleResults };