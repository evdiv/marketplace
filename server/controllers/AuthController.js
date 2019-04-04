const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/config');
const User = require('../models/user');

module.exports = {

    store: async(req, res, next) => {
        const data = _.pick(req.body, ['name', 'email', 'password'])
        data.password = await bcrypt.hash(req.body.password, 8)
        try {
            const user = await User.create(data)
            if(!user) {
                return res.status(404).send("There was a problem registering the user.")
            }
    
            // if user is registered without errors create a token
            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
    
            res.status(200).send({ auth: true, token: token }); 
            
        } catch(err) {
            return res.status(500).send("There was a problem registering the user." + err)
        }
    },

    login: async(req, res, next) => {
        try{
            const user = await User.findOne({ email: req.body.email }).populate('orders')
            if(!user) {
                res.status(404).send('No user found.')
            }
    
            // check if the password is valid
            const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null })
            }
    
            // if user is found and password is valid
            // create a token
            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
    
            // return the information including token as JSON
            res.status(200).send({ auth: true, token })
            
        } catch(err) {
            return res.status(500).send('Error on the server.')
        }
    },

    logout: async(req, res, next) => {
        res.status(200).send({ auth: false, token: null });
    }
}