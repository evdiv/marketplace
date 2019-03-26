const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Category = require('../models/Category');


router.post('/', async (req, res) => {
    const data = _.pick(req.body, ['title', 'description'])

    try {
        const category = await Category.create(data)
        if(!category) {
            return res.status(404).send({})
        }
        res.status(200).send(category)
    } catch(err) {
        return res.status(500).send("There was a problem adding the information to the database.")
    }
});



router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({})
        if(!categories) {
            return res.status(404).send({})
        }
        res.status(200).send(categories)
    } catch(err) {
        return res.status(500).send("There was a problem finding the categories." + err)
    }
});


router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if(!category) {
            return res.status(404).send("No category found.");
        }

        res.status(200).send(category);
    } catch(err) {
        return res.status(500).send("There was a problem finding the category.")
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const category = Category.findByIdAndRemove(req.params.id);
        if(!category) {
            return res.status(404).send("No category found.");
        }
        res.status(200).send(category);
    }catch(err) {
        return res.status(500).send("There was a problem deleting the category.");
    }
});



router.patch('/:id', async (req, res) => {
    const data = _.pick(req.body, ['title', 'description'])
    try {
        const category = Category.findByIdAndUpdate(req.params.id, data, {new: true});
        if(!category) {
            return res.status(404).send("No category found.");
        }        
    }catch(err) {
        return res.status(500).send("There was a problem updating the category.");
    }
});

module.exports = router;