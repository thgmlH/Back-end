//API router
var express = require('express');
var router = express.Router();

var UserController = require('./controller.js');
const User = require('./mongodb.js');

router.get('/', UserController.getUsers)
router.post('/insertdata', UserController.insertUsers)
router.post('/deletedata', UserController.deleteUsers)
router.post('/updatedata', UserController.updateUsers)

module.exports = router;