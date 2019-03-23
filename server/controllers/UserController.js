const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const verifyToken = require('./verifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('../models/User');


router.post('/', async function (req, res) {
    const data = _.pick(req.body, ['name', 'email', 'password', 'phone'])
    try {
        const user = await User.create(data)
        if(!user) {
            return res.status(404).send({})
        }
        res.status(200).send(user)
    } catch(err) {
        return res.status(500).send("There was a problem adding the information to the database.")
    }
});



router.get('/', async function (req, res) {
    try {
        const users = await User.find({})
        if(!users) {
            return res.status(404).send({})
        }
        res.status(200).send(users)
    } catch(err) {
        return res.status(500).send("There was a problem finding the users.")
    }
});


router.get('/:id', async function (req, res) {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.status(404).send("No user found.");
        }
        res.status(200).send(user);
    } catch(err) {
        return res.status(500).send("There was a problem finding the user.")
    }
});



router.delete('/:id', async function (req, res) {
    try {
        const user = User.findByIdAndRemove(req.params.id);
        if(!user) {
            return res.status(404).send("No user found.");
        }
        res.status(200).send(user);
    }catch(err) {
        return res.status(500).send("There was a problem deleting the user.");
    }
});



router.put('/:id', async function (req, res) {
    const data = _.pick(req.body, ['name', 'email', 'phone', 'password'])
    try {
        const user = User.findByIdAndUpdate(req.params.id, data, {new: true});
        if(!user) {
            return res.status(404).send("No user found.");
        }        
    }catch(err) {
        return res.status(500).send("There was a problem updating the user.");
    }
});