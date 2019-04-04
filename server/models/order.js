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
        minlength: 10,
        trim: true
    },
    maxPrice: {
        type: Number,
        required: false,
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
    phone: {
        type: String,
        required: false,
    },         
    dueDate: {
        type: Date,
        required: false,
    },
    createdAt: {
        type: Date,
        required: false
    },
    completedAt: {
        type: Date,
        required: false
    },    
    active: {
        type: Boolean,
        default: false
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    }],     
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    labour: {
        type: Schema.Types.ObjectId,
        ref: 'Labour'        
    }
});

module.exports = Order