const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/db_client');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/getFridgeInventory', async (req, res) => {
    const products = await db.getFridgeInventory(req.body.name);
    console.log(products);
    res.json(products);
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
