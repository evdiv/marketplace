const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Review = mongoose.model('Review', {
    description: {
        type: String,
        required: true,
        minlength: 25,
        trim: true
    },
    price: {
        type: Number,
        required: false,
        min: 0,
        max: 5
    },
    service: {
        type: Number,
        required: false,
        min: 0,
        max: 5
    },
    punctuality: {
        type: Number,
        required: false,
        min: 0,
        max: 5
    },
    recommend: {
        type: Number,
        required: false,
        min: 0,
        max: 5
    },
    active: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        required: false
    }
});

module.exports = Review