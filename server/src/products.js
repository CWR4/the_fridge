const db = require("./connection");

const connection = db();
function executeQuery(query, callback){    
    connection.query(query, function(error, rows, field) {
        if(error){
            console.log(error);
            return;
        } else {
            console.log("Query succesfull");
            // console.log(rows);
            return callback(rows);
        }
    });
}

module.exports = executeQuery;

// db.end(function(){
//     console.log("Connection closed");
// });