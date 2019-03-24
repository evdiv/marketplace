const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('../models/User');


router.post('/', async (req, res) => {
    const data = _.pick(req.body, ['name', 'email', 'password', 'phone'])

    data.password = await bcrypt.hash(req.body.password, 8)
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



router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 })
        if(!users) {
            return res.status(404).send({})
        }
        res.status(200).send(users)
    } catch(err) {
        return res.status(500).send("There was a problem finding the users." + err)
    }
});


router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id, { password: 0 }).populate('orders')
        if(!user) {
            return res.status(404).send("No user found.");
        }

        res.status(200).send(user);
    } catch(err) {
        return res.status(500).send("There was a problem finding the user.")
    }
});


router.delete('/:id', async (req, res) => {
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



router.patch('/:id', async (req, res) => {
    const data = _.pick(req.body, ['name', 'email', 'phone', 'password'])
    data.password = await bcrypt.hash(req.body.password, 8)
    try {
        const user = User.findByIdAndUpdate(req.params.id, data, {new: true});
        if(!user) {
            return res.status(404).send("No user found.");
        }        
    }catch(err) {
        return res.status(500).send("There was a problem updating the user.");
    }
});

module.exports = router;