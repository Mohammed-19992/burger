
// Importing (require) connection.js
var connection = require("./connection");

// creating the methods that will execute the necessary MySQL commands in the controllers. 
var orm = {
// selectAll method
    selectAll: function (tableInput) {
        var query = "SELECT * FROM ??";
        return new Promise((resolve, reject) => {
            connection.query(query, [tableInput], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },
// insertOne method
    insertOne: function (tableInput, obj) {
        var query = `INSERT INTO BURGERS SET ?`;
        return new Promise((resolve, reject) => {
            connection.query(query, obj, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },
// updateOne method
    updateOne: function (tableInput, updateCol, updateVals, idColumn, objectId) {
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [tableInput, updateCol, updateVals, idColumn, objectId], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
};

module.exports = orm;