const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/db_client');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/createFridge', (req, res) => {
    db.createNewFridge(req.body.name).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch((error) => {
        res.status(500).json({
            code: error.code,
            error: error.errno,
            message: error.sqlMessage,
             });
        console.error(error);
    });
});

app.post('/api/deleteFridge', (req, res) => {
    db.deleteFridge(req.body.name).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch((error) => {
        res.status(500).json({
            message: error.message,
        });
        console.error(error);
    });
});

app.post('/api/upsertProduct', (req, res) => {
    console.log('Logging', req.body);
    db.upsertProduct(req.body).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch((error) => {
        res.status(500).json({
            code: error.code,
            error: error.errno,
            message: error.sqlMessage,
        });
        console.error(error);
    });
});

app.post('/api/deleteProduct', (req, res) => {
    db.deleteProduct(req.body).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch((error) => {
        res.status(500).json({
            message: error.message,
        });
        console.error(error);
    });
})

app.get('/api/getFridgeInventory', (req, res) => {
    db.getFridgeInventory(req.query.name).then((result) => {
        console.log(result);
        res.json(result);
    }).catch((error) => {
        if (error.message === 'Unsuccessful') {
            res.sendStatus(204);
        } else {
            res.status(204).json({
                code: error.code,
                error: error.errno,
                sqlMessage: error.sqlMessage,
                message: error.message,
            });
        }
        console.error(error);
    });
});

app.get('/api/getFridgeShoppingList', (req, res) => {
    db.getShoppingList(req.query.name).then((result) => {
        console.log(result);
        res.json(result);
    }).catch((error) => {
        if (error.message === 'Unsuccessful') {
            res.sendStatus(204);
        } else {
            res.status(204).json({
                code: error.code,
                error: error.errno,
                sqlMessage: error.sqlMessage,
                message: error.message,
            });
        }
        console.error(error);
    });
});

app.get('/api/getFridges', (req, res) => {
    db.getFridges().then((result) => {
        console.log(result);
        res.json(result);
    }).catch((error) => {
        res.status(500).json({
            code: error.code,
            error: error.errno,
            sqlMessage: error.sqlMessage,
            message: error.message,
        });
        console.error(error);
    });
});

app.get('/api/getAllProducts', (req, res) => {
    db.getAllProducts(req.query.name).then((result) => {
        console.log(result);
        res.json(result);
    }).catch((error) => {
        if (error.message === 'Unsuccessful') {
            res.sendStatus(204);
        } else {
            res.status(204).json({
                code: error.code,
                error: error.errno,
                sqlMessage: error.sqlMessage,
                message: error.message,
            });
        }
        console.error(error);
    });
});

app.get('/api/getFridgeDataByName', (req, res) => {
    db.getFridgeDataByName(req.query.name).then((result) => {
        console.log(result);
        res.json(result);
    }).catch((error) => {
        if (error.message === 'Unsuccessful') {
            res.sendStatus(204);
        } else {
            res.status(204).json({
                code: error.code,
                error: error.errno,
                sqlMessage: error.sqlMessage,
                message: error.message,
            });
        }
        console.error(error);
    });
});

app.listen(8000, () => {
    console.log('Listening to port 8000');
});
