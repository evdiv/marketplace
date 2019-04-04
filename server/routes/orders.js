const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const verifyToken = require('../middlewares/verifyToken');
const OrderController = require('../controllers/OrderController');


router.route('/')
    .get(OrderController.index)
    .post(verifyToken, OrderController.store);

router.route('/:id')
    .get(OrderController.show) 
    .patch(verifyToken, OrderController.update)
    .delete(verifyToken, OrderController.destroy);    
  
module.exports = router;