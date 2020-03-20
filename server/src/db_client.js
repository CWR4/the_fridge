const db = require('./connection');
const connection = db.connectToDatabase();

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
        });
    });
}

function deleteFridge(fridgeName) {
    return new Promise((resolve, reject) => {
        $deleteFridge = 'delete from fridges where `name` = ?;';
        // deleting doesn't throw an error if there is no record to delete
        // but affectedRows is 0 in this case, hence the following error-handling
        connection.query($deleteFridge, fridgeName, (error, result) => {
            if (result.affectedRows != 0) {
                result.message = "Fridge deleted: " + fridgeName;
                resolve(result);
            } else if (result.affectedRows === 0) {
                result.message = "Unsuccessful";
                reject(result);
            }
        });
    });
}

function upsertProduct(payload){
    return new Promise((resolve, reject) => {
        $findProduct = 'select * from products WHERE `name` = ? AND `fridge_id` = ?';
        queryParams = [
            payload.product.name,
            payload.fridge_id,
        ];
        connection.query($findProduct, queryParams, (error, result) => {
            //Catch, because updateProduct and insertProduct are returning 
            // Promises => otherwise no error-handling
            if (!error && result.length == 0) {
                insertProduct(payload).then((insertResult) => {
                    resolve(insertResult);
                }).catch((error) => {
                    reject(error);
                });
            } else if (!error && result.length != 0) {
                updateProduct(payload).then((updateResult) => {
                    resolve(updateResult);
                }).catch((error) => {
                    reject(error);
                });
            } else if (error) {
                reject(error);
            }
        });
    });
}

function insertProduct(payload) {
    return new Promise((resolve, reject) => {
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
        connection.query($insertProduct, queryParams, (error, result) => {
            if (!error) {
                result.message = "Product added";
                resolve(result);
            } else if (error) {
                reject(error);
            }
        });
    });
}

function updateProduct(payload) {
    return new Promise((resolve, reject) => {
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
        connection.query($updateProduct, queryParams, (error, result) => {
            if (!error) {
                result.message = "Product updated";
                resolve(result);
            } else if (error) {
                reject(error);
            }
        });
    });
}

function getFridges() {
    return new Promise((resolve, reject) => {
        $getFridges = 'select * from fridges;';
        connection.query($getFridges, (error, result) => {
            if (!error) {
                resolve(result);
            } else if (error) {
                reject(error);
            }
        });
    });
}

function deleteProduct(payload){
    return new Promise((resolve, reject) => {
        $deleteProduct = 'delete from products where name = ? AND fridge_id = ?';
        queryParams = [
            payload.product.name,
            payload.fridge_id,
        ];
        // deleting doesn't throw an error if there is no record to delete
        // but affectedRows is 0 in this case, hence the following error-handling
        connection.query($deleteProduct, queryParams, (error, result) => {
            if (result.affectedRows != 0) {
                result.message = "Product deleted: " + payload.product.name;
                resolve(result);
            } else if (result.affectedRows === 0) {
                result.message = "Unsuccessful";
                reject(result);
            }
        });
    });
}

function getFridgeInventory(fridgeName){
    return new Promise((resolve, reject) => {
        $getFridgeInventory = 'select p.* from products as p, fridges as f where f.name = ? and f.id = p.fridge_id and p.amount > 0;';
        connection.query($getFridgeInventory, fridgeName, (error, result) => {
            if (!error && result.length != 0) {
                resolve(result);
            } else if (!error && result.length === 0) {
                result.message = "Unsuccessful";
                reject(result);
            } else if (error) {
                reject(error);
            }
        });
    });
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
