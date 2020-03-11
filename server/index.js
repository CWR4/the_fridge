const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/db_client');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/createFridge', (req, res) => {
    db.createNewFridge(req.body.name, (error) => {
        if(error.errno == 1062) {
            res.sendStatus(409);
        } else if(error.errno == undefined) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
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
