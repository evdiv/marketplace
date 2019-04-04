const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Labour = mongoose.model('Labour', {
    active: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true,
        minlength: 25,
        trim: true
    },
    city: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },    
    address: {
        type: String,
        required: false,
        minlength: 5,
        trim: true
    },    
    postalCode: {
        type: String,
        required: false,
        minlength: 5,
        trim: true
    },        
    createdAt: {
        type: Date,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    }],
    completeOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Reviews'
    }]
});

module.exports = Labour