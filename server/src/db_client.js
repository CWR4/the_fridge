const db = require('./connection');
const mysql = require('mysql');

const connection = db.connectToDatabase();

function createNewFridge(fridgeName){
    $createFridgeQuery = 'insert into fridges (`name`) values (?);';
    db.executeQuery(connection, $createFridgeQuery, [fridgeName], () => {});
}

function deleteFridge(fridgeName) {
    $deleteFridge = 'delete from fridges where `name` = ?;'
    db.executeQuery(connection, $deleteFridge, [fridgeName], () => {});
}

function upsertProduct(payload){
    $findProduct = 'select * from products WHERE `name` = ? AND `fridge_id` = ?';
    queryParams = [
            payload.product.name,
            payload.fridge_id,
    ];
    db.executeQuery(connection, $findProduct, queryParams, (product) => {
        if(product.length == 0) {
            $insertProduct = 'insert into products (name, amount, always_available, min_amount, fridge_id, purchased) values (?,?,?,?,?,?)';
            queryParams = [
                payload.product.name,
                payload.product.amount,
                payload.product.always_available,
                payload.product.min_amount,
                payload.fridge_id,
                payload.product.purchased,
            ];
            db.executeQuery(
                connection,
                $insertProduct,
                queryParams,
                (error) => {
                console.log(error);
            });
        } else {
            $updateProduct = 'update products set amount = ?, always_available = ?, min_amount = ? WHERE name = ? AND fridge_id = ?';
            queryParams = [
                payload.product.amount,
                payload.product.always_available,
                payload.product.min_amount,
                payload.product.name,
                payload.fridge_id
            ];
            db.executeQuery(
                connection,
                $updateProduct,
                queryParams,
                (error) => {
                    console.log(error);
                }
            )
        }
    })
}


function getFridges() {
    $getFridges = 'select * from fridges;';
    db.executeQuery(connection, $getFridges, [], (results) => {
        console.log(results);
    });
}

function deleteProduct(payload){
    $deleteProduct = 'delete from products where name = ? AND fridge_id = ?';
    queryParams = [
        payload.product.name,
        payload.fridge_id,
    ];

    db.executeQuery(
        connection,
        $deleteProduct,
        queryParams,
        (error) => {
            console.log(error);
        }
    );
}

function getFridgeInventory(fridgeName){
    $getFridgeInventory = 'select p.* from products as p, fridges as f where f.name = ? and f.id = p.fridge_id and p.amount > 0;';
    queryParams = [
        fridgeName,
    ];
    db.executeQuery(
        connection,
        $getFridgeInventory,
        queryParams,
        (products) => {
            console.log(products)
        }
    );
}

function getShoppingList(fridgeId) {
    $getShoppingList = 'select * from products where fridge_id = ? and amount_to_buy > 0;';
    queryParams = [
        fridgeId,
    ];
    db.executeQuery(
        connection,
        $getShoppingList,
        queryParams,
        (products) => {
            console.log(products)
        }
    );
}

//getShoppingList(8);
//getFridgeInventory("MyFridge")
//deleteProduct({fridge_id:8,product:{name:"butter",amount:8,always_available:true,min_amount:1,purchased:true}})
//getFridges();
//createNewFridge("MyFridge2");
//deleteFridge("MyFridge2");
//upsertProduct({fridge_id:8,product:{name:"butter",amount:8,always_available:true,min_amount:1,purchased:true}})
//db.endConnection(connection);




