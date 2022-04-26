//firebase + rdb req logic controller
var pool = require('./mysql.js');
var config = require('./config.js');

var { ref, child, get } = require("firebase/database");
var serviceAccount = require("./serviceAccount.json");

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),  
  databaseURL: ""
}, "DB");

const logic = {
	acodelist : function(req, res){

		var data = req.body; //JSON형태
		var respond = [];
		var query, arg;

		if(data.acode == "0000"){
		    query = "SELECT name, gender, birth, email, serial, min(reg_date) AS 'first', max(reg_date) AS 'last', count(serial) AS 'count' " + 
			    "FROM data_table WHERE acode IS NOT NULL GROUP BY serial"
		    arg = null;
		}
		else if(data.acode != "0000" && data.acode.slice(-1) == "0"){
		    query = "SELECT name, gender, birth, email, serial, min(reg_date) AS 'first', max(reg_date) AS 'last', count(serial) AS 'count' " + 
			    "FROM data_table WHERE acode LIKE \'" + data.acode.slice(0, 2) + "%\' GROUP BY serial";
		    arg = null;
		}
		else{
		    query = "SELECT name, gender, birth, email, serial, min(reg_date) AS 'first', max(reg_date) AS 'last', count(serial) AS 'count' " + 
			    "FROM data_table WHERE acode = ? GROUP BY serial";
		    arg = userData.agency_code;
		}

		pool.query(query, arg, function(error, results, field){
		    console.log(results);
		    if(error){
			console.log(error)
		    }
		    else{
			for(var i=0; i<results.length; i++){
			    respond.push({
				"name" : results[i].name, 
				"gender" : (results[i].gender == "female") ? '여' : '남',
				"birth" : results[i].birth,
				"email" : results[i].email,
				"serial" : results[i].serial,
				"first" : results[i].first, 
				"last" : results[i].last, 
				"count" : results[i].count
			    })
			    console.log(respond)
			    if(respond.length == results.length){
				console.log("Finish to get ba agency list");
				console.log({"Respond" : respond})
				return res.send(respond)
			    }
			}
		    }
		})
	},
	detaillist : function(req, res){

		var data = req.body; //JSON형태
		var respond = [];
		var query, arg;

		if(data.acode == "0000"){
		    query = "SELECT name, gender, birth, serial, reg_date, step, type, category, stt, stt_url, sentiment " +
			    "FROM data_table WHERE reg_date BETWEEN ? AND ? AND acode IS NOT NULL and acode != ''";
		    arg = [data.start + " 00:00:00", data.end + " 23:59:59"];
		}
		else if(data.acode != "0000" && data.acode.slice(-1) == "0"){
		    query = "SELECT name, gender, birth, serial, reg_date, step, type, category, stt, stt_url, sentiment " + 
			    "FROM data_table WHERE acode LIKE \'" + data.acode.slice(0, 2) + "%\' AND acode != '' AND reg_date BETWEEN ? AND ?";
		    arg = [data.start + " 00:00:00", data.end + " 23:59:59"];
		}
		else{
		    query = "SELECT name, gender, birth, serial, reg_date, step, type, category, stt, stt_url, sentiment " + 
			    "FROM data_table WHERE acode = ? AND acode != '' AND reg_date BETWEEN ? AND ?";
		    arg = [data.acode, data.start + " 00:00:00", data.end + " 23:59:59"]
		}

		pool.query(query, arg, function(error, results, field){
		    console.log(results)
		    if(error)
			console.log(error);
		    else{
			if(results.length == 0){
			    return res.send({"result" : false, "message" : "No data"})
			}
			else{
			    for(var i=0; i<results.length; i++){
				respond.push({
				    "name" : results[i].name, 
				    "gender" : (results[i].gender == "female") ? '여' : '남',
				    "birth" : results[i].birth,
				    "serial" : results[i].serial,
				    "reg_date" : (results[i].reg_date.split(' ')[1].split(':')[0]) / 12 >= 1 ? "오후" : "오전", 
				    "step" : results[i].step + "회기", 
				    "type" : (results[i].type == 1) ? "활동" : "기분",
				    "category" : results[i].category,
				    "STT" : results[i].stt,
				    "stt_url" : results[i].stt_url,
				    "sentiment" : (results[i].sentiment == "positive") ? "긍정" : ((results[i].sentiment == "negative") ? "부정" : "중립")                            
				})
			    }
			    if(respond.length == results.length){
				console.log("respond length", respond.length)
				console.log({"Respond" : respond})
				return res.send(respond)
			    }
			}
		    }
		})
	},
	deleteagency : function(req, res){
		const work = async () => {
		    try{
			var data = req.body; //JSON형태

			pool.query("UPDATE data_table SET acode = '' WHERE serial = ?", data.serial, function(error, results, field){
			    if(error)
				console.log(error);
			    else{
				console.log(results)
				return res.send({
				    "result" : true
				})
			    }
			})

		    } catch(err) {
			console.log(err);
			return res.send({
			    "result" : false,
			    "message" : err
			})
		    }
		}
		work();
	}
}

module.exports = logic
