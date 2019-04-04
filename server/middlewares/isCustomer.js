const verifyToken = require('./verifyToken');
const Customer = require('../models/customer');

function isCustomer(req, res, next) {
    verifyToken(req, res, async() => { 

        try {
            let customer = await Customer.findById(req.params.id)
            if(!customer) {
                return res.status(404).send("No customer found.");
            }
    
            if(customer.user.toHexString() !== req.userId) {
                return res.status(403).send("You don't have enough permissions to edit this customer");
            }
    
            next();
          
        }catch(err) {
            return res.status(500).send("There was a problem updating the customer.");
        }

    });
}

module.exports = isCustomer;