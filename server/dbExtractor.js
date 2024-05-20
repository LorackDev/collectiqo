const connection = require('./dbConnector');

const extractData = (tableName) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tableName}`, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = extractData;