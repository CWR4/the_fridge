const db = require('./connection');
const connection = db.connectToDatabase();
function getAllBlogPosts() {
    return new Promise((resolve, reject) => {
        $getAllBlogPosts = 'select * from blog_posts order by time desc';
        connection.query($getAllBlogPosts, function (error, rows, field) {
            console.log(rows);
            resolve(rows);
        });
    });
}
function createNewFridge(fridgeName){
    return new Promise((resolve, reject) => {
        $createFridgeQuery = 'insert into fridges (`name`) values (?);';
        connection.query($createFridgeQuery, fridgeName, (error, result) => {
            if (!error) {
                result.message = "Fridge created: " + fridgeName;
                resolve(result);
            } else if (error){
                reject(error);
            }
        })
    })
}

function deleteFridge(fridgeName, callback) {
    $deleteFridge = 'delete from fridges where `name` = ?;'
    db.executeQuery(connection, $deleteFridge, [fridgeName], (error) => {
        callback(error);
    });
}

function upsertProduct(payload){
    $findProduct = 'select * from products WHERE `name` = ? AND `fridge_id` = ?';
    queryParams = [
            payload.product.name,
            payload.fridge_id,
    ];
    db.executeQuery(connection, $findProduct, queryParams, (product) => {
        if(product.length == 0) {
            insertProduct(payload);
        } else {
            updateProduct(payload);
        }
    })
}

function insertProduct(payload) {
    $insertProduct = 'insert into products (name, amount, always_available, min_amount, fridge_id, purchased, amount_to_buy) values (?,?,?,?,?,?,?)';
    queryParams = [
        payload.product.name,
        payload.product.amount,
        payload.product.always_available,
        payload.product.min_amount,
        payload.fridge_id,
        payload.product.purchased,
        payload.product.amount_to_buy,
    ];
    db.executeQuery(
        connection,
        $insertProduct,
        queryParams,
        (error) => {
            console.log(error);
        });
}

function updateProduct(payload) {
    $updateProduct = 'update products set amount = ?, always_available = ?, min_amount = ?, purchased = ?, amount_to_buy = ? WHERE name = ? AND fridge_id = ?';
    queryParams = [
        payload.product.amount,
        payload.product.always_available,
        payload.product.min_amount,
        payload.product.purchased,
        payload.product.amount_to_buy,
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

function getFridges(callback) {
    $getFridges = 'select * from fridges;';
    db.executeQuery(connection, $getFridges, [], (results) => {
        console.log(results);
        return callback(results);
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

function getFridgeInventory(fridgeName, callback){
    $getFridgeInventory = 'select p.* from products as p, fridges as f where f.name = ? and f.id = p.fridge_id and p.amount > 0;';
    queryParams = [
        fridgeName,
    ];
    db.executeQuery(
        connection,
        $getFridgeInventory,
        queryParams,
        (products) => {
            callback(products);
        }
    );
}

function getShoppingList(fridgeId, callback) {
    $getShoppingList = 'select * from products where fridge_id = ? and amount_to_buy > 0;';
    queryParams = [
        fridgeId,
    ];
    db.executeQuery(
        connection,
        $getShoppingList,
        queryParams,
        (products) => {
            callback(products);
        }
    );
}

module.exports = {
    createNewFridge,
    deleteFridge,
    upsertProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    getFridgeInventory,
    getShoppingList,
};
