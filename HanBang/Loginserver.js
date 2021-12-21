const express = require('express');
const app = express();

app.listen(3000, () => {
                        console.log('DBconnecting listening on port 3000!');
});

var id, password, name;
var p = "No";
//var Login;

app.post('/login', function(req, res, next){
        console.log('who get in here post /login');
        var inputData;
        //Login = {'LoginP':'Yes'};

        req.on('data', (data) => {
                inputData = JSON.parse(data);
        });

        req.on('end', () => {
                id = inputData.ID;
                password = inputData.Password;

                console.log("Id : " + id + "Password : " + password);

                var mysql = require('mysql');

                var connection = mysql.createConnection({
                        host : 'localhost',
                        port : 3306,
                        user : 'root',
                        password : 'lllhy18',
                        database : 'HanBang'
                });

                var sql = 'SELECT * FROM User WHERE ID LIKE ? AND Password LIKE ?';
                var params = [id, password];
                connection.connect();
                connection.query(sql, params, function(err, results, field){
                        if(results.length >= 1)
                                p = 'Yes';
                        else
                                p = 'No';
                        next();
                });
        });
});

app.use('/yes', function(req, res, next){
        console.log("p : " + p);
        res.send(p);
        res.end();
        next();
});

app.post('/info', function(req, res, next){
        console.log('who get in here post /info');
        var inputData;

        req.on('data', (data) => {
                inputData= JSON.parse(data);
        });

        req.on('end', () => {
                id = inputData.ID;
                console.log(id);
                var mysql = require('mysql');

                var connection = mysql.createConnection({
                        host : 'localhost',
                        port : 3306,
                        user : 'root',
                        password : 'lllhy18',
                        database : 'HanBang'
                });

                var sql = "SELECT * FROM User WHERE ID LIKE ?";
                var params = [id];
                connection.connect();
                connection.query(sql, params, function(err, results, field){
                        //console.log(results);
                        name = results[0].NAME;
                        next();
                });
        });
});
app.post('/name', function(req, res, next){
        res.send(name);
        res.end();
        next();
});

app.post('/infoc', function(req, res, next){
        console.log('who get in here post /infoc');
        var inputData;

        req.on('data', (data) => {
                inputData = JSON.parse(data);
        });

        req.on('end', () => {
                password = inputData.Password;
                phone = inputData.Phone;
                id = inputData.ID;
                //console.log();
                var mysql = require('mysql');

                var connection = mysql.createConnection({
                        host : 'localhost',
                        port : 3306,
                        user : 'root',
                        password : 'lllhy18',
                        database : 'HanBang'
                });

                var sql = "UPDATE User SET Password=?, Phone=? WHERE ID=?";
                var params = [password, phone, id];
                connection.connect();
                connection.query(sql, params, function(err, results, field){
                        console.log(results);
                        next();
                });
        });
});
