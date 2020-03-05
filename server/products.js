const db = require("./connection");


db.connect(function(error) {
    if(error) {
        console.log(error.code);
        console.log(error.fatal);
        return;
    } else {
        console.log('Connected');
    }
});

$showAllProducts = 'select * from products';

db.query($showAllProducts, function(error, rows, field) {
    if(error){
        console.log(error);
        return;
    } else {
        console.log("Query succesfull");
        console.log(rows);
    }
});

db.end(function(){
    console.log("Connection closed");
});