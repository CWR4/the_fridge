const mysql = require('mysql');

function connectToDatabase() {

    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'the_fridge'
    });

    connection.connect(function (error) {
        if (error) {
            console.log(error.code);
            console.log(error.fatal);
            return;
        } else {
            console.log('Connected');
        }
    });
    return connection;
}

function executeQuery(connection, query, queryParams, callback) {
    connection.query(query, queryParams, function (error, rows, field) {
        if (error) {
            console.log(error);
            return;
        } else {
            console.log("Query succesfull");
            // console.log(rows);
            return callback(rows);
        }
    });
}

function endConnection(connection) {
    connection.end(function() {
        console.log("Connection closed");
    });
}

module.exports = {
    connectToDatabase,
    executeQuery,
    endConnection
};
