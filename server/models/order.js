const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Order = mongoose.model('Order', {
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
    maxPrice: {
        type: Number,
        required: false,
    },
    dueDate: {
        type: Date,
        required: false,
    },
    active: {
        type: Boolean,
        default: false
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Order