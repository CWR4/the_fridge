const db = require('./connection');
const mysql = require('mysql');

const connection = db.connectToDatabase();

function createNewFridge(fridgeName){
    $createFridgeQuery = mysql.createQuery(
        'insert into fridges (`name`) values (?);',
        [
            fridgeName
        ]
    );
    db.executeQuery(connection, $createFridgeQuery, () => {});
}

function deleteFridge(fridgeName) {
    $deleteFridge = mysql.createQuery(
        'delete from fridges where `name` = ?;',
        [
            fridgeName
        ]);
    db.executeQuery(connection, $deleteFridge, () => {});
}

function upsertProduct(payload){
    $findObject = mysql.createQuery(
        'select * from products WHERE `name` = ? AND `fridge_id` = ?',
        [
            payload.product.name,
            payload.fridge_id,
        ]
    );
    db.executeQuery(connection, $findObject,(product) => {
        if(product == []) {
            $insertProduct = mysql.createQuery(
                'insert into products (name, amount, always_available, min_amount, fridge_id) values (?,?,?,?,?)',
                [
                    payload.product.name,
                    payload.product.amount,
                    payload.product.always_available,
                    payload.product.min_amount,
                    payload.fridge_id,
                ]
            );
            db.executeQuery(
                connection,
                $insertProduct,
                (error) => {
                    console.log(error);
                });
        } else {
            $updateProduct = mysql.createQuery(
                'update products (amount, always_available, min_amount) set (?,?,?) WHERE name = ? AND fridge_id = ?',
                [
                    payload.product.amount,
                    payload.product.always_available,
                    payload.product.min_amount,
                    payload.product.name,
                    payload.fridge_id
                ]
            );
            db.executeQuery(
                connection,
                $updateProduct,
                (error) => {
                    console.log(error);
                }
            )
        }
    })
}

//createNewFridge("MyFridge2");
//deleteFridge("MyFridge2");
upsertProduct({fridge_id:7,product:{name:"milch",amount:2,always_avaiable:true,min_amount:1}})
db.endConnection(connection);

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