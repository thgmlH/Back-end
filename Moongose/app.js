var router = require('./routes.js')
var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');

require('dotenv').config({path:'./config.env'});

var server = express();
server.use(
    bodyParser.urlencoded({
        extended: true
    })
);
server.use(bodyParser.json()); 
server.use('/test', router);

server.listen('8080', ()=>{
	console.log('Server listening on port 8080');
	mongoose.connect(process.env.MONGO_URI)
})
