const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Category = mongoose.model('Category', {
    title: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 25,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = Category