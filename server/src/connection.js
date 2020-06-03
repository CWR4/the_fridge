const mysql = require('mysql');

function connectToDatabase() {

    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root123',
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

function endConnection(connection) {
    connection.end(function() {
        console.log("Connection closed");
    });
}

module.exports = {
    connectToDatabase,
    endConnection,
};
