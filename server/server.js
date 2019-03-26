const express = require('express');
const {mongoose} = require('./db/mongoose');
const {port} = require('./config/config');

const app = express();

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const OrderController = require('./controllers/OrderController');
const CategoryController = require('./controllers/CategoryController');


app.use('/users', UserController);
app.use('/auth', AuthController);
app.use('/orders', OrderController);
app.use('/categories', CategoryController);


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app}