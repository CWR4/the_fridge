const db = require('./connection');
const connection = db.connectToDatabase();

function createNewFridge(fridgeName){
    return new Promise((resolve, reject) => {
        $createFridgeQuery = 'insert into fridges (`name`) values (?);';
        queryParams = [
            fridgeName,
        ]
        connection.query($createFridgeQuery, queryParams, (error, result) => {
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
        queryParams = [
            fridgeName,
        ]
        // deleting doesn't throw an error if there is no record to delete
        // but affectedRows is 0 in this case, hence the following error-handling
        connection.query($deleteFridge, queryParams, (error, result) => {
            if (!error && result.affectedRows != 0) {
                result.message = "Fridge deleted: " + fridgeName;
                resolve(result);
            } else if (!error && result.affectedRows === 0) {
                result.message = "Unsuccessful";
                reject(result);
            } else if (error) {
                reject(error);
            }
        });
    });
}

function upsertProduct(payload){
    return new Promise((resolve, reject) => {
        $findProduct = 'select * from products as p, fridges as f WHERE p.name = ? AND f.name = ? and f.id = p.fridge_id';
        queryParams = [
            payload.product.name,
            payload.fridgeName,
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
            payload.product.fridge_id,
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
            payload.product.fridge_id
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
            if (!error && result.affectedRows != 0) {
                result.message = "Product deleted: " + payload.product.name;
                resolve(result);
            } else if (!error && result.affectedRows === 0) {
                result.message = "Unsuccessful";
                reject(result);
            } else if (error) {
                reject(error);
            }
        });
    });
}

function getFridgeInventory(fridgeName){
    return new Promise((resolve, reject) => {
        $getFridgeInventory = 'select p.* from products as p, fridges as f where f.name = ? and f.id = p.fridge_id and p.amount > 0;';
        queryParams = [
            fridgeName,
        ]
        connection.query($getFridgeInventory, queryParams, (error, result) => {
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

function getShoppingList(fridgeName) {
    return new Promise((resolve, reject) => {
        $getShoppingList = 'select p.* from products as p, fridges as f where f.name = ? and f.id = p.fridge_id and amount_to_buy > 0;';
        queryParams = [
            fridgeName,
        ]
        connection.query($getShoppingList, queryParams, (error, result) => {
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

function getAllProducts(fridgeName) {
    return new Promise((resolve, reject) => {
        $getProducts = 'select p.* from products as p, fridges as f where f.name = ? and f.id = p.fridge_id;';
        queryParams = [
            fridgeName,
        ]
        connection.query($getProducts, queryParams, (error, result) => {
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

function getFridgeDataByName(fridgeName) {
    return new Promise((resolve, reject) => {
        $getFridgeData = 'select * from fridges where name = ?;';
        queryParams = [
            fridgeName,
        ]
        connection.query($getFridgeData, queryParams, (error, result) => {
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

module.exports = {
    createNewFridge,
    deleteFridge,
    upsertProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    getFridgeInventory,
    getShoppingList,
    getFridges,
    getAllProducts,
    getFridgeDataByName,
};
