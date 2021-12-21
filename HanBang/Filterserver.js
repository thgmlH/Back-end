const express = require('express');
const app = express();

app.listen(3000, () => {
                console.log('DBconnecting listening on port 3000!');
});

var deposit, monthlyrent, yearrent, floor, rooms;
var Rooms, index;

app.post('/filter',(req, res, next) => {
                console.log('who get in here post');
                var inputData;

                req.on('data', (data) => {
                        inputData = JSON.parse(data);
                        deposit = inputData.Deposit;
                        monthlyrent=inputData.MonthlyRent;
                        yearrent=inputData.YearRent;
                        floor=inputData.Floor;
const express = require('express');
const app = express();

app.listen(3000, () => {
                console.log('DBconnecting listening on port 3000!');
});

var deposit, monthlyrent, yearrent, floor, rooms;
var Rooms, index;

app.post('/filter',(req, res, next) => {
                console.log('who get in here post');
                var inputData;  
                
                req.on('data', (data) => {
                        inputData = JSON.parse(data);
                        deposit = inputData.Deposit;
                        monthlyrent=inputData.MonthlyRent;
                        yearrent=inputData.YearRent;
                        floor=inputData.Floor;
                        rooms=inputData.Rooms;
                        
                        //index = ["Location", "Floor", "MonthlyRent", "Maintencecost", "Roomspace", "Elevator", "Distancefs", "Refrigerator", "Washer", "Microwave", "Closet", "Induction", "Shoecloset", "Veranda", "Wifi", "Smoke", "Desk", "TimeRegister", "id"];

//                      Rooms = new Object();
//                      Rooms = [{"Location":"Seoul", "Floor":0, "MonthlyRent":0, "Maintencecost":0, "Roomspace":0, "Elevator":0, "Distancefs":0, "Refrigerator":0, "Washer":0. "Microwave":0, "Closet":0, "Induction":0, "Shoecloset":0, "Veranda":0, "Wifi":0, "Smoke":0, "Desk":0, "RimeRegister":"20210529 15:00", "id":1234}];

                        console.log('Deposit :  ' + deposit + "MonthlyRent : " + monthlyrent + "YearRent : " + yearrent + "Floor : " + floor + "Rooms : " + rooms);
                });

                req.on('end', () => {
                        var mysql = require('mysql');

                        var connection = mysql.createConnection({
                                host : 'localhost',
                                port : 3306,
                                user : 'root',
                                password : 'lllhy18',
                                database : 'HanBang'
                        });

                        var sql = 'SELECT * FROM Room WHERE (Deposit = ?) AND (MonthlyRent = ?) AND (YearRent = ?) AND (Floor = ?) AND (Rooms = ?)';
                        var params = [deposit, monthlyrent, yearrent, floor, rooms];
                        connection.connect();
                        connection.query(sql, params, function(err, results, field){
                                console.log(results);
                                Rooms = JSON.stringify(results);
                                console.log(Rooms);
                                next();
                        });
        });
}, function(req, res){
        res.send(Rooms);
        res.end();
});
