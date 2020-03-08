const db = require('./connection')
const connection = db.connectToDatabase();


function createNewFridge(fridgeName){
    $createFridgeQuery = 'insert into fridges (name) values ("' + fridgeName + '");'
    db.executeQuery(connection, $createFridgeQuery, () => {});
}

function insertNewProduct(product){

}

createNewFridge("MyFridge2");
db.endConnection(connection);

function getAllProducts(){

}


function updateProductAmount(product_name, amount){

}

function deleteProduct(product){

}