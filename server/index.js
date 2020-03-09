const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require("./src/connection");

app.use(bodyParser.json());
app.use(cors());

const connection = db.connectToDatabase();

const showAllProducts = "select * from products";

app.get('/api/getAll', async (req, res) => {
    db.executeQuery(connection, showAllProducts, [], function(products){
        for (var product in products){
            console.log();
            console.log('Produkt: ' + products[product].name);
            console.log('Menge: ' + products[product].amount);
            console.log('Immer vorhanden: ' + products[product].always_avaiable);
            console.log('Mindestmenge: ' + products[product].min_amount);
        }
    })
    res.sendStatus(200);
});

app.get('/hallo', (req, res) => {
    res.send('Hallo du');
});

app.post('/du', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

app.listen(8000, () => {
    console.log('Listening to port 8000');
});
