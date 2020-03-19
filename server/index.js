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

app.post('/api/getFridgeInventory', (req, res) => {
    db.getFridgeInventory(req.body.name, (products) => {
        res.json(products);
    })
});

app.post('/api/getFridgeShoppingList', (req, res) => {
    db.getShoppingList(req.body.fridge_id, (products) => {
        res.json(products);
    })
});

app.post('/api/upsertProduct', (req, res) => {
    db.upsertProduct(req.body);
    res.sendStatus(200);
});

app.listen(8000, () => {
    console.log('Listening to port 8000');
});
