require('dotenv').config();

let db = process.env.MONGODB_URI

 if(process.env.NODE_ENV === 'test') {
    db = process.env.TEST_MONGODB_URI
}

module.exports = {
    db,
    port: process.env.PORT,
    secret: process.env.JWT_SECRET
  };
