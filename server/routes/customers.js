const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const verifyToken = require('../middlewares/verifyToken');
const isCustomer = require('../middlewares/isCustomer');
const CustomerController = require('../controllers/CustomerController');

router.route('/')
    .get(CustomerController.index)
    .post(verifyToken, CustomerController.store);

router.route('/:id')
    .get(CustomerController.show)
    .patch(isCustomer, CustomerController.update)
    .delete(isCustomer, CustomerController.destroy);
  
module.exports = router;