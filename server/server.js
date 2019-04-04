const express = require('express');
const {mongoose} = require('./db/mongoose');
const {port} = require('./config/config');

const app = express();

//Routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const customers = require('./routes/customers');
const orders = require('./routes/orders');

app.use('/auth', auth);
app.use('/users', users);
app.use('/customers', customers);
app.use('/orders', orders);


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app}