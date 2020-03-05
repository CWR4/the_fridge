const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'standard_user',
    password: '',
    database: 'the_fridge'
});

module.exports = connection;

