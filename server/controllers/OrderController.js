const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const verifyToken = require('../middlewares/verifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Order = require('../models/order');
const User = require('../models/User');

router.post('/', verifyToken, async (req, res) => {
    const data = _.pick(req.body, ['title', 'description', 'maxPrice', 'dueDate', 'active'])

    try {
        const user = await User.findById(req.userId, { password: 0 }).populate('customer')
        const order = new Order(data)

        order.customer = user.customer
        await order.save()

        user.orders.push(order)
        await user.save()

        if(!order) {
            return res.status(404).send({})
        }
        res.status(201).send({order})
    } catch(err) {
        return res.status(500).send("There was a problem adding the order to the database." + err)
    }
});


router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({})
        if(!orders) {
            return res.status(404).send({})
        }
        res.status(200).send({orders})
    } catch(err) {
        return res.status(500).send("There was a problem finding the orders." + err)
    }
});


router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('customer')
        if(!order) {
            return res.status(404).send("No order found.");
        }
        res.status(200).send({order});
    } catch(err) {
        return res.status(500).send("There was a problem finding the order." + err)
    }
});



router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order) {
            return res.status(404).send("No order found.");
        }

        if(order.customer.toHexString() !== req.userId) {
            return res.status(403).send("You don't have enough permissions to delete this order");
        }

        await Order.findByIdAndRemove(req.params.id)

        res.status(201).send({order});
    }catch(err) {
        return res.status(500).send("There was a problem deleting the order.");
    }
});



router.patch('/:id', verifyToken, async (req, res) => {
    const data = _.pick(req.body, ['title', 'description', 'maxPrice', 'dueDate', 'active'])
    try {
        let order = await Order.findById(req.params.id).populate('customer')
        if(!order) {
            return res.status(404).send("No order found.");
        }

        if(order.customer.user.toHexString() !== req.userId) {
            return res.status(403).send("You don't have enough permissions to edit this order");
        }

        order = await Order.findByIdAndUpdate(req.params.id, data, {new: true});
        return res.status(201).send({order});
      
    }catch(err) {
        return res.status(500).send("There was a problem updating the user.");
    }
});

module.exports = router;