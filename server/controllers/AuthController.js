const _ = require('lodash');

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const verifyToken = require('../middlewares/verifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

const User = require('../models/User');


router.post('/login', async function(req, res) {

    try{
        const user = await User.findOne({ email: req.body.email })
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
});


router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});


router.post('/register', async function(req, res) {
    const data = _.pick(req.body, ['name', 'email', 'password', 'phone'])
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
})


router.get('/account', verifyToken, async function(req, res) {
    try {
        const user = await User.findById(req.userId, { password: 0 })
        if(!user) {
            return res.status(404).send("No user found.")
        }
        res.status(200).send(user);
    } catch(err) {
        return res.status(500).send("There was a problem finding the user.")
    }
})

module.exports = router;