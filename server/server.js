const express = require('express');
const {mongoose} = require('./db/mongoose');
const {port} = require('./config/config');

const app = express();

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const OrderController = require('./controllers/OrderController');

app.use('/users', UserController);
app.use('/auth', AuthController);
app.use('/orders', OrderController);

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app}