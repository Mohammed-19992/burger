// Connecting Node to MySQL.
var mysql = require("mysql");

var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
          host: "localhost",
          port:"3306",
        user: "root",
        password: process.env.MYSQL_PASSWORD,
        database: "burger_db"    });
};

// Exporting the connection.
module.exports = connection;
