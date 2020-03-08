const mysql = require('mysql');

function connectToDatabase() {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'hurg3649',
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

function executeQuery(connection, query, callback) {
    connection.query(query, function (error, rows, field) {
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

