const verifyToken = require('./verifyToken');

function isUser(req, res, next) {
    verifyToken(req, res, () => {

        if(req.params.id !== req.userId) {
            return res.status(403).send("You don't have permissions to access this resource")
        }
        next();
    });
}

module.exports = isUser;