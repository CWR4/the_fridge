const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'the_fridge'
});

const db = connection.connect(function(error) {
    if(error) {
        console.log(error.code);
        console.log(error.fatal);
        return;
    } else {
        console.log('Connected');
    }
});

$showAllProducts = 'select * from products';

connection.query($showAllProducts, function(error, rows, field) {
    if(error){
        console.log(error);
        return;
    } else {
        console.log("Query succesfull");
        console.log(rows);
    }
});

connection.end(function(){
    console.log("Connection closed");
});

//module.exports = db;

