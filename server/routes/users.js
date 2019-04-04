const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const isUser = require('../middlewares/isUser');
const UserController = require('../controllers/UserController');

router.route('/')
    .get(UserController.index)

router.route('/:id')
    .get(UserController.show)
    .patch(isUser, UserController.update)
    .delete(isUser, UserController.destroy);    
  

module.exports = router;