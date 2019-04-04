const _ = require('lodash');

const Customer = require('../models/customer');
const User = require('../models/user');

module.exports = {
    
    index: async(req, res, next) => {
        try {
            const customers = await Customer.find({})
            if(!customers) {
                return res.status(404).send({})
            }
            res.status(200).send(customers)
        } catch(err) {
            return res.status(500).send("There was a problem finding the customers." + err)
        }
    },

    store: async(req, res, next) => {
        const data = _.pick(req.body, ['description', 'phone', 'city', 'address', 'postalCode'])
        data.createdAt = Date.now()
    
        try {
            const user = await User.findById(req.userId, { password: 0 })
            const customer = new Customer(data)
            await customer.save()

            user.customer = customer._id
            await user.save()

            res.status(201).send({customer})
            
        } catch(err) {
            return res.status(500).send("There was a problem adding the customer to the database." + err)
        }
    },

    show: async(req, res, next) => { 
        try {
            const customer = await Customer.findById(req.params.id).populate('user')
            if(!customer) {
                return res.status(404).send("No customer found.");
            }
            res.status(200).send({customer});
        } catch(err) {
            return res.status(500).send("There was a problem finding the customer." + err)
        }
    },

    update: async(req, res, next) => {
        const data = _.pick(req.body, ['description', 'phone', 'city', 'address', 'postalCode'])
        try {    
            let customer = await Customer.findByIdAndUpdate(req.params.id, data, {new: true});
            return res.status(201).send({customer});
          
        }catch(err) {
            return res.status(500).send("There was a problem updating the customer.");
        }
    },

    destroy: async(req, res, next) => {
        try {
            await Customer.findByIdAndRemove(req.params.id)
            res.status(201).send({customer});

        }catch(err) {
            return res.status(500).send("There was a problem deleting the customer.");
        }
    }
}