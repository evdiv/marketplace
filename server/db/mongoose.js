const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/youdo', {useNewUrlParser: true});

module.exports = {mongoose}