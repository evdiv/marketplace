const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Customer = mongoose.model('Customer', {
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: false,
    }, 
    phone: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    postalCode: {
        type: String,
        required: false,
    },    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },    
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

module.exports = Customer