const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const executeQuery = require('./src/products');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const showAllProducts = "select * from products";

app.get('/api/getAll', async (req, res) => {
    executeQuery(showAllProducts, function(products){
        console.log(products);
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
