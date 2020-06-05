const mysql = require('mysql');

/** @returns Connections to MariaDB database */
function connectToDatabase() {

    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'standard',
        password: 'standard',
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

/** terminates connection to MariaDB database
 * @param: connection to terminate
 */
function endConnection(connection) {
    connection.end(function() {
        console.log("Connection closed");
    });
}

module.exports = {
    connectToDatabase,
    endConnection,
};
