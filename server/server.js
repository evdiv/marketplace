const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Order} = require('./models/order');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/orders', (req, res) => {
    let order = new Order({
        title: req.body.title
    });

    order.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/orders', (req, res) => {
    Order.find().then((orders) => {
        res.send({orders});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/orders/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    Order.findById(id).then((order) => {
        if(!order) {
            return res.status(404).send();
        }
        res.send({order});
    }, (err) => {
        res.status(400).send(err)
    });
});

app.delete('/orders/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    Order.findByIdAndDelete(id).then((order) => {
        if(!order) {
            return res.status(404).send();
        }
        res.send({order});
    }, (err) => {
        res.status(400).send(err)
    });
});

app.patch('/orders/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    let body = _.pick(req.body, ['title', 'active']);
    Order.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((order) => {
        if(!order) {
            res.status(404).send();
        }
        res.send({order});
    }).catch((err) => {
        res.status(400).send(err);
    })
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app}