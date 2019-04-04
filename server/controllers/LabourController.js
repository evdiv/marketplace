const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Labour = require('../models/Labour');


router.post('/', verifyToken, async (req, res) => {
    const data = _.pick(req.body, ['description', 'city', 'address', 'postalCode'])
    data.createdAt = Date.now()

    try {
        const user = await User.findById(req.userId, { password: 0 })
        const labour = new Labour(data)

        labour.user = user
        await labour.save()

        if(!labour) {
            return res.status(404).send({})
        }
        res.status(201).send({labour})
    } catch(err) {
        return res.status(500).send("There was a problem adding the labour to the database." + err)
    }
});


router.get('/', async (req, res) => {
    try {
        const labour = await Labour.find({})
        if(!labour) {
            return res.status(404).send({})
        }
        res.status(200).send({labour})
    } catch(err) {
        return res.status(500).send("There was a problem finding the worker." + err)
    }
});


router.get('/:id', async (req, res) => {
    try {
        const labour = await Labour.findById(req.params.id).populate('user')
        if(!labour) {
            return res.status(404).send("No worker found.");
        }
        res.status(200).send({labour});
    } catch(err) {
        return res.status(500).send("There was a problem finding the worker." + err)
    }
});


router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const labour = await Labour.findById(req.params.id)
        if(!labour) {
            return res.status(404).send("No worker found.");
        }

        if(labour.user.toHexString() !== req.userId) {
            return res.status(403).send("You don't have enough permissions to delete this worker");
        }

        await Labour.findByIdAndRemove(req.params.id)

        res.status(201).send({labour});
    }catch(err) {
        return res.status(500).send("There was a problem deleting the labour.");
    }
});


router.patch('/:id', verifyToken, async (req, res) => {
    const data = _.pick(req.body, ['description', 'city', 'address', 'postalCode'])
    try {
        const labour = await Labour.findById(req.params.id)
        if(!labour) {
            return res.status(404).send("No worker found.");
        }

        if(labour.user.toHexString() !== req.userId) {
            return res.status(403).send("You don't have enough permissions to edit this worker");
        }

        labour = await Labour.findByIdAndUpdate(req.params.id, data, {new: true});
        return res.status(201).send({labour});
      
    }catch(err) {
        return res.status(500).send("There was a problem updating the worker.");
    }
});

module.exports = router;