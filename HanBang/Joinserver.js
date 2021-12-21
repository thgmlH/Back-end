const express = require('express');
const app = express();

app.listen(3000, () => {
                console.log('DBconnecting listening on port 3000!');
});

var id, name, password, phone;
var p;

app.post('/join', function(req, res, next){
        console.log('who get in here post /join');
        var inputData;

        req.on('data', (data) => {
                        inputData = JSON.parse(data);
                });

        req.on('end', () => {
                        id = inputData.ID;
                        name = inputData.NAME;
                        password = inputData.Password;
                        phone = inputData.Phone;

                        console.log(name + ", " + id);
                        var mysql = require('mysql');

                        var connection = mysql.createConnection({
                                host : 'localhost',
                                port : 3306,
                                user : 'root',
                                password : 'lllhy18',
                                database : 'HanBang'
                        });

                        var sql = "INSERT INTO User(Registernum, ID, Password, Phone, NAME) VALUES(?, ?, ?, ?, ?)";
                        var params = [0, id, password, phone, name];
                        connection.connect();
                        connection.query(sql, params, function(err, results, field){
                                console.log('Succeed');
                        });
        });
});


app.post('/id', function(req, res, next){
        console.log('who get in here post /id');
        var inputData;

        req.on('data', (data) => {
                inputData = JSON.parse(data);
        });
        req.on('end', () => {
                id = inputData.ID;

                console.log("Id : " + id);

                var mysql = require('mysql');

                var connection = mysql.createConnection({
                                host : 'localhost',
                                port : 3306,
                                user : 'root',
                                password : 'lllhy18',
                                database : 'HanBang'
                });

                var sql = 'SELECT * FROM User WHERE ID LIKE ?';
                var params = [id];
                connection.connect();
                connection.query(sql, params, function(err, results, field){
                        if(results.length >= 1)
                                p = 1;
                        else
                                p = 0;
                        console.log(results.length + " p : " + p);
                        next();
                });
        });
}, function(req, res){
        if(p >= 1)
                res.write("");
        else
                res.write(id);
        res.end();
});
