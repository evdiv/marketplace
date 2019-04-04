const Order = require('../models/Order');
const verifyToken = require('./verifyToken');

function orderBelongsToUser(req, res, next) {
    verifyToken(req, res, async() => {
        try {
            let order = await Order.findById(req.params.orderId).populate('customer')
            if(!order) {
                return res.status(404).send("No order found.");
            }
    
            if(order.customer.user.toHexString() !== req.userId) {
                return res.status(403).send("You don't have enough permissions to edit this order");
            }

            next();

        }catch(err) {
            return res.status(500).send("There was a problem updating the user.");
        }
    });
}

module.exports = orderBelongsToUser;