const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const AuthController = require('../controllers/AuthController');

router.route('/register')
    .post(AuthController.store);

router.route('/login')
    .post(AuthController.login);   

router.route('/logout')
    .get(AuthController.logout); 
            

module.exports = router;