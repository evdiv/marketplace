const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Order} = require('./models/order');

const app = express();

app.use(bodyParser.json());

app.post('/orders', (req, res) => {
    let order = new Order({
        title: req.body.title
    });

    order.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
});



app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app}