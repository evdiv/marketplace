const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    labour: {
        type: Schema.Types.ObjectId,
        ref: 'Labour'
    },
});

module.exports = User