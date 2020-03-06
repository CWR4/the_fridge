const db = require("./connection");

const connection = db();

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

// db.end(function(){
//     console.log("Connection closed");
// });