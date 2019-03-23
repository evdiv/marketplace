const { db } = require('../config/config');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false
});

module.exports = {mongoose}