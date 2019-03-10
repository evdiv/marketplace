const mongoose = require('mongoose');

const Order = mongoose.model('Order', {
    title: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    active: {
        type: Boolean,
        default: false
    }
});

module.exports = {Order}