const _ = require('lodash');

const Order = require('../models/order');
const User = require('../models/user');
const Customer = require('../models/customer');

module.exports = {

    index: async(req, res, next) => {
        try {
            const orders = await Order.find({})
            if(!orders) {
                return res.status(404).send({})
            }
            res.status(200).send({orders})
        } catch(err) {
            return res.status(500).send("There was a problem finding the orders." + err)
        }
    },

    store: async(req, res, next) => {
        const data = _.pick(req.body, ['title', 'description', 'city', 'address', 'phone', 'postalCode', 'maxPrice', 'dueDate'])

        try {
            const user = await User.findById(req.userId, { password: 0 })
            const customer = await Customer.findById(user.customer)

            const order = new Order(data)
    
            order.customer = customer._id
            await order.save()

            customer.orders.push(order._id)
            await customer.save()
    
            res.status(201).send({order})
            
        } catch(err) {
            return res.status(500).send("There was a problem adding the order to the database." + err)
        }
    },

    show: async(req, res, next) => {
        try {
            const order = await Order.findById(req.params.orderId)
            if(!order) {
                return res.status(404).send("No order found.");
            }
            res.status(200).send({order});
        } catch(err) {
            return res.status(500).send("There was a problem finding the order." + err)
        }
    },

    update: async(req, res, next) => {
        const data = _.pick(req.body, ['title', 'description', 'city', 'address', 'phone', 'postalCode', 'maxPrice', 'dueDate'])
        try {
            let order = await Order.findById(req.params.orderId).populate('customer')
            if(!order) {
                return res.status(404).send("No order found.");
            }
    
            if(order.customer.user.toHexString() !== req.userId) {
                return res.status(403).send("You don't have enough permissions to edit this order");
            }
    
            order = await Order.findByIdAndUpdate(req.params.orderId, data, {new: true});
            return res.status(201).send({order});
          
        }catch(err) {
            return res.status(500).send("There was a problem updating the user.");
        }
    },

    destroy: async(req, res, next) => {
        try {
            const order = await Order.findById(req.params.orderId).populate('customer')
            if(!order) {
                return res.status(404).send("No order found.");
            }
    
            if(order.customer.user.toHexString() !== req.userId) {
                return res.status(403).send("You don't have enough permissions to delete this order");
            }
    
            await Order.findByIdAndRemove(req.params.orderId)
    
            res.status(201).send({order});
        }catch(err) {
            return res.status(500).send("There was a problem deleting the order.");
        }
    }
};