// src/server/dbConnections/mysqlService.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.MYSQL_DATABASE_HOST,
    port: process.env.MYSQL_DATABASE_PORT,
    user: process.env.MYSQL_DATABASE_USER,
    password: process.env.MYSQL_DATABASE_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL connected!");
    }
});

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

function handleResults(results) {
    if (results.length === 0) {
        return false;
    }
    return results[0];
}

module.exports = { db, queryDatabase, handleResults };