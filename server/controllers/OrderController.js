const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Order = require('../models/order');

router.post('/', async function (req, res) {
    const data = _.pick(req.body, ['title', 'description', 'maxPrice', 'dueDate', 'active'])

    try {
        const order = await Order.create(data)
        if(!order) {
            return res.status(404).send({})
        }
        res.status(200).send(order)
    } catch(err) {
        return res.status(500).send("There was a problem adding the information to the database." + err)
    }
});


router.get('/', async function (req, res) {
    try {
        const orders = await Order.find({})
        if(!orders) {
            return res.status(404).send({})
        }
        res.status(200).send(orders)
    } catch(err) {
        return res.status(500).send("There was a problem finding the orders." + err)
    }
});


router.get('/:id', async function (req, res) {
    try {
        const order = await Order.findById(req.params.id)
        if(!order) {
            return res.status(404).send("No user found.");
        }
        res.status(200).send(order);
    } catch(err) {
        return res.status(500).send("There was a problem finding the user.")
    }
});



router.delete('/:id', async function (req, res) {
    try {
        const order = Order.findByIdAndRemove(req.params.id);
        if(!order) {
            return res.status(404).send("No user found.");
        }
        res.status(200).send(order);
    }catch(err) {
        return res.status(500).send("There was a problem deleting the user.");
    }
});



router.put('/:id', async function (req, res) {
    const data = _.pick(req.body, ['title', 'description', 'maxPrice', 'dueDate', 'active'])
    try {
        const order = Order.findByIdAndUpdate(req.params.id, data, {new: true});
        if(!order) {
            return res.status(404).send("No user found.");
        }        
    }catch(err) {
        return res.status(500).send("There was a problem updating the user.");
    }
});

module.exports = router;