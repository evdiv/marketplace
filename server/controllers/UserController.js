const _ = require('lodash');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

module.exports = {

    index: async(req, res, next) => {
        try {
            const users = await User.find({}, { password: 0 })
            if(!users) {
                return res.status(404).send({})
            }
            res.status(200).send(users)
        } catch(err) {
            return res.status(500).send("There was a problem finding the users." + err)
        }
    },

    show: async(req, res, next) => {
        try {
            const user = await User.findById(req.params.id, { password: 0 }).populate('orders')
            if(!user) {
                return res.status(404).send("No user found.");
            }
    
            res.status(200).send(user)
        } catch(err) {
            return res.status(500).send("There was a problem finding the user.")
        }
    },

    update: async(req, res, next) => {
        const data = _.pick(req.body, ['name', 'email', 'password'])
        data.password = await bcrypt.hash(req.body.password, 8)

        try {
            const user = await User.findByIdAndUpdate(req.params.id, data, {new: true});
            if(!user) {
                return res.status(404).send("No user updated.");
            } 
            res.status(200).send(user)
            
        }catch(err) {
            return res.status(500).send("There was a problem updating the user." + err);
        }
    },

    destroy: async(req, res, next) => {
        try {
            const user = await User.findByIdAndRemove(req.params.id);
            if(!user) {
                return res.status(404).send("No user found.");
            }
            res.status(200).send(user);
        }catch(err) {
            return res.status(500).send("There was a problem deleting the user.");
        }
    }
}