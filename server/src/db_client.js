const db = require('./connection')
const connection = db.connectToDatabase();


function createNewFridge(fridgeName){
    $createFridgeQuery = 'insert into fridges (name) values ("' + fridgeName + '");';
    db.executeQuery(connection, $createFridgeQuery, [], () => {});
}

function upsertProduct(payload){
    $findObject = 'select * from products WHERE name = ? AND fridge_id = ?';
    db.executeQuery(connection, $findObject, [payload.product.name, payload.fridge_id], (product) => {
        if(!product) {
            $insertProduct = 'insert into products (name, amount, always_available, min_amount, fridge_id) values (?,?,?,?,?)';
            db.executeQuery(
                connection,
                $insertProduct,
                [
                    payload.product.name,
                    payload.product.amount,
                    payload.product.always_available,
                    payload.product.min_amount,
                    payload.fridge_id,
                ],
                (error) => {
                    console.log(error);
                });
        } else {
            $updateProduct = 'update products (amount, always_available, min_amount) set (?,?,?) WHERE name = ? AND fridge_id = ?';
            db.executeQuery(
                connection,
                $updateProduct,
                [
                    payload.product.amount,
                    payload.product.always_available,
                    payload.product.min_amount,
                    payload.product.name,
                    payload.fridge_id
                ],
                (error) => {
                    console.log(error);
                }
            )
        }
    })

}

function getFridgeInventory(){
    $getAll = 'select * from products where'
}


function deleteProduct(product){
    $deleteProduct = 'delete from products where name = ? AND fridge_id = ?';
    db.executeQuery(
        connection,
        $deleteProduct,
        [
            payload.product.name,
            payload.fridge_id,
        ],
        (error) => {
            console.log(error);
        }
    );
}
