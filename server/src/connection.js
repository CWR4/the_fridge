const mysql = require('mysql');

function connectToDatabase() {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'standard_user',
        password: '',
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


module.exports = connectToDatabase;

