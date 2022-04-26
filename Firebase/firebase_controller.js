//firebase req logic controller
var { Observable, concat } = require('rxjs');
const router = express.Router();
var async = require('async');

// firebase Admin 써드파티 미들웨어 
var admin = require("firebase-admin");
var { getDatabase } = require("firebase-admin/database");
var { ref, child, get } = require("firebase/database");
var serviceAccount = require("./serviceAccount.json");

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),  
  databaseURL: ""
}, "DB");

var db = app.firestore()
var rtdb = getDatabase(app);

const logic = {
	dataAdd : function(req, res){
	    const work = async () => {
		console.log("Data add Function start")
		try{
		    var data = req.body; //JSON형태

		    db.collection(data.coll)
		    .add({
			name : data.user_name,
			email : data.user_email,
			password : data.user_password
		    })
		    .then(() => {
			console.log("added successfully")
			return res.send({
			    "result" : true,
			    "message" : "Add successfully"
			})
		    }, (err) => {
			throw err;
		    }); 
		    }catch(err) {
			console.log(err);
			return res.send({
			    "result" : false,
			    "message" : "Failed to add"
			})
		    }
	    	}
	    work();
	},
	dataDelete : function(req, res){
	    const work = async () => {
		try{
		    var data = req.body;

		  db.collection(data.coll)
		    .doc(data.doc)
		    .delete({
			// filed 특정 값 삭제? or field값 다 삭제?
		    })
		    .then(() => {
			console.log("deleted successfully")
			return res.send({
			    "result" : true,
			    "message" : "Delete successfully"
			})
		    }, (err) => {
			throw err;
		    });
		    } catch(err) {
			console.log(err);
			return res.send({
			    "result" : false,
			    "message" : "Failed to delete"
			})
		    }
	    }
	    work();
	},
	dataUpdate : function(req, res){
	    const work = async () => {
		try{
		    var data = req.body; //JSON형태

		    db.collection(data.coll)
		    .doc(data.doc)
		    .update({
			// filed 특정 어느 값 갱신?
		    })
		    .then(() => {
			console.log("updated successfully")
			return res.send({
			    "result" : true,
			    "message" : "Update successfully"
			})
		    }, (err) => {
			throw err;
		    });
		    } catch(err) {
			console.log(err);
			return res.send({
			    "result" : false,
			    "message" : "Failed to update"
			})
		    }
	    }
	    work();
	},
	dataSearch : function(req, res){
	    const work = async () => {
	      console.log('Data search Function start')
	      try{
		  var data = req.body; //JSON형태
		  var respond = [];

		  db.collection('account')
		  .where('manager', '==', data.manager)
		  .get()
		  .then(doc => {
		      if (doc.empty){
			  return res.send({
			      "result" : false,
			      "message" : "No such data"
			  })
		      }
		      else{
			  doc.forEach(item =>{  //item이 저장한 데이터 객체 원본입니다.                            
			      respond.push({
				  "name": item.data().name,
				  "picture": item.data().picture,
				  "email" : item.data().email,
				  "docid" : item.id
			      })
			  });
			  console.log({"Respond" : respond})
			  return res.send(respond);
		      }
		  })
		  } catch(err) {
		      console.log(err);
		      return res.send({
			  "result" : false,
			  "message" : "Failed to get data"
		      });
		  }
	      }
	    work();
	},
	returnuserinfo : function(req, res){
	    const work = async () => {
	      console.log("Return user info Function start")
	      try{
		  var data = req.body; //JSON형태
		  var respond = [];

		  db.collection('account')
		  .where('serial', '==', data.serial)
		  .get()
		  .then(doc => {
		      if (doc.empty){
			  return res.send({
			      "result" : false,
			      "message" : "No such data"
			  })
		      }
		      else{
			  doc.forEach(item =>{  //item이 저장한 데이터 객체 원본입니다.                            
			      respond.push({
				  "name": item.data().name,
				  "gender": item.data().gender,
				  "birthday" : item.data().birthDay.slice(0, 4) + "-" + item.data().birthDay.slice(4, 6) + "-" + item.data().birthDay.slice(6, 8)
			      })
			  });
			  console.log({"Respond" : respond})
			  return res.send(respond);
		      }
		  })
		  } catch(err) {
		      console.log(err);
		      return res.send({
			  "result" : false,
			  "message" : "Failed to get data"
		      });
		  }
	      }
	    work();
	},
	login : function(req, res){
	   const work = async () => {
	      console.log("Login Function start")
	      try{
		  var data = req.body; //JSON형태

		  db.collection('account')
		  .where('email', '==', data.email).where('password' , '==', data.password)
		  .get()
		  .then(doc => {
		    if (doc.empty){
		      return res.send({
			  "result" : false,
			  "message" : "No such data"
		      })
		    }
		    else{
		      doc.forEach(item => {
			  var respond = {
			      "result" : true,
			      "docid" : item.id
			  }
			  console.log({"Respond" : respond})
			  return res.send(respond)
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
	},
	pushsend : function(req, res){
	    const work = async () => {
	      console.log("Push send Function start")
	      try{
		  const data = req.body;
		  var token;

		  db.collection('account')
		  .doc(data.docid)
		  .update({
		      confirm : data.confirm
		  }).then(() => {
		      console.log("updated successfully")
		      return res.send({
			  "result" : true,
			  "message" : "Push message succeed"
		      })
		  }, (err) => {
		      console.log(error)
		      res.send({
			  "result" : false,
			  "message" : "Failed to update"
		      })
		  });
	      } catch(err) {
		  console.log(err);
		  return res.send({
		      "result" : false,
		      "message" : err
		  })
	      }
	    }
	    work();  	
	},
	confirminsert : function(req, res){
	      var data = req.body;

	      const insertconfirm = new Observable((subscriber) => {
		  db.collection(data.coll)
		      .doc(data.doc)
		      .update({
			  confirm : data.confirm
		      })
		      .then(() => {
			  console.log("updated successfully")
			  return res.send({
			      "result" : true,
			      "message" : "Insert successfully"
			  })
		      }, (err) => {
			  throw err;
		      });
	      })

	      const push = new Observable((subscriber) => {
		  const dbRef = ref(rtdb);

		  get(child(dbRef,`device/${data.id}`)).then((snapshot) => {
		    if (snapshot.exists()) {
		      console.log(snapshot.val().token);
		    } else {
		      console.log("No data available");
		    }
		  }).catch((error) => {
		    console.error(error);
		  });
	      })

	      insertconfirm.subscribe(v=> {return res.send(v)});
	      push.subscribe(v=> {return res.send(v)});
	},
	getagency : function(req, res){
	   const work = async () => {
	      var respond = [];
	      var data = req.body;

	      try{
		  if(data.acode){
		      if(data.acode == '0000'){
			  db.collection('agency')
			  .orderBy('acode')
			  .get()
			  .then(doc => {
			      if (doc.empty){
				  return res.send({
				      "result" : false,
				      "message" : "No document"
				  })
			      }
			      else{
				  doc.forEach(item => {
				      respond.push({
					  "acode" : item.data().acode
				      })
				  })
				  console.log({"Respond" : respond})
				  return res.send(respond)
			      }
			  })
		      }
		      else if(data.acode.slice(-1) == "0"){
			  db.collection('agency')
			  .where('acode', '>=', data.acode.slice(0, 2)).where('acode', '<', data.acode.slice(0, 2) + 1)
			  .orderBy('acode')
			  .get()
			  .then(doc => {
			      if (doc.empty){
				  return res.send({
				      "result" : false,
				      "message" : "No document"
				  })
			      }
			      else{
				  doc.forEach(item => {
				      respond.push({
					  "acode" : item.data().agency_code
				      })
				  })
				  console.log({"Respond" : respond})
				  return res.send(respond)
			      }
			  })
		      }
		      else{
			  db.collection('agency')
			  .where('acode', '==', data.acode)
			  .get()
			  .then(doc => {
			      if (doc.empty){
				  return res.send({
				      "result" : false,
				      "message" : "No document"
				  })
			      }
			      else{
				  doc.forEach(item => {
				      respond.push({
					  "acode" : item.data().acode
				      })
				  })
				  console.log({"Respond" : respond})
				  return res.send(respond)
			      }
			  })
		      }
		  }
		  else if(!data.acode){
		      db.collection('agency')
		      .orderBy('agency_code')
		      .get()
		      .then(doc => {
			  if (doc.empty){
			      return res.send({
				  "result" : false,
				  "message" : "No document"
			      })
			  }
			  else{
			      doc.forEach(item => {
				  respond.push({
				      "acode" : item.data().acode
				  })
			      })
			      console.log({"Respond" : respond})
			      return res.send(respond)
			  }
		      })
		  }
	      }catch(err) {
		  console.log(err);
		  return res.send({
		      "result" : false,
		      "message" : err
		  })
	      }
	    }
	    work();
	},
	getlist : function(req, res){
	    const work = async () => {
	      var user = [];
	      var summary = {};
	      var respond = {user, summary};
	      var f = 0;
	      var m = 0;
	      var avgage = 0;

	      try{
		  var data = req.body; //JSON형태
		  var aname;

		  async.waterfall([

		      function(callback){
			  db.collection('agency')
			  .where('acode', '==', data.acode)
			  .get()
			  .then(doc => {
			      doc.forEach(item => {
				  acode = item.data().acode
				  callback(null)
			      })
			  })
		      }

		  ], function(err, result){
		      if(data.acode.slice(-1) == "0" && data.acode != "0000"){  //상급기관이 들어온 상황
			  console.log("상급")
			  db.collection('account')
			  .where('acode', '>', data.acode.slice(0, 2)).where('acode', '<', data.acode.slice(0, 2)+1)
			  .get()
			  .then(doc => {
			      var isExist = false;
			      doc.forEach(item => {
				  if(item.data().manager){
				      isExist = true;
				      return false;    
				  } 
			      })
			      if (!isExist){    
				  respond.summary = {
				      "female" : 0,
				      "male" : 0,
				      "avgage" : 0
				  }
				  console.log({"Respond" : respond})
				  return res.send(respond)
			      }
			      else{
				  doc.forEach(item => {
				      if(item.data().manager){
					  respond.user.push({
					      "docid" : item.id,
					      "name" : item.data().name,
					      "gender" : item.data().gender,
					      "birthDay" : item.data().birthDay.slice(0, 4) + "-" + item.data().birthDay.slice(4, 6) + "-" + item.data().birthDay.slice(6, 8),
					      "email" : item.data().email,
					      "registrationTimestamp" : new Date(item.data().registrationTimestamp).toISOString().slice(0, 10)
					  })
					  if(item.data().gender == "female")
					      f++;
					  else if(item.data().gender == "male")
					      m++;
					  avgage += parseInt(new Date().getFullYear()) - item.data().birthDay.slice(0, 4) + 1
				      }
				  })
				  respond.summary = {
				      "female" : f,
				      "male" : m,
				      "avgage" : (avgage/(respond.user.length)).toFixed(1)
				  }
				  console.log({"Respond" : respond})
				  return res.send(respond)
			      }
			  })
		      }
		      else if(data.acode == "0000"){
			  console.log("전체")
			  db.collection('account')
			  .where('manager', '!=', "")
			  .get()
			  .then(doc => {
			      if (doc.empty){
				  return res.send({
				      "result" : false,
				      "message" : "No such data"
				  })
			      }
			      else{
				  doc.forEach(item => {
				      respond.user.push({
					  "docid" : item.id,
					  "name" : item.data().name,
					  "gender" : item.data().gender,
					  "birthDay" : item.data().birthDay.slice(0, 4) + "-" + item.data().birthDay.slice(4, 6) + "-" + item.data().birthDay.slice(6, 8),
					  "email" : item.data().email,
					  "registrationTimestamp" : new Date(item.data().registrationTimestamp).toISOString().slice(0, 10)
				      })
				      if(item.data().gender == "female")
					  f++;
				      else if(item.data().gender == "male")
					  m++;
				      avgage += parseInt(new Date().getFullYear()) - item.data().birthDay.slice(0, 4) + 1
				  })
				  respond.summary = {
				      "female" : f,
				      "male" : m,
				      "avgage" : (avgage/(respond.user.length)).toFixed(1)
				  }
				  console.log({"Respond" : respond})
				  return res.send(respond)
			      }
			  })
		      }
		      else{  //하급기관이 들어온 상황
			  console.log("하급")
			  db.collection('account')
			  .where('manager', '!=', "").where('acode', '==', data.acode)
			  .get()
			  .then(doc => {
			      if (doc.empty){
				  respond.summary = {
				      "female" : 0,
				      "male" : 0,
				      "avgage" : 0
				  }
				  console.log({"Respond" : respond})
				  return res.send(respond)
			      }
			      else{
				  doc.forEach(item => {
				      respond.user.push({
					  "docid" : item.id,
					  "name" : item.data().name,
					  "gender" : item.data().gender,
					  "birthDay" : item.data().birthDay.slice(0, 4) + "-" + item.data().birthDay.slice(4, 6) + "-" + item.data().birthDay.slice(6, 8),
					  "email" : item.data().email,
					  "registrationTimestamp" : new Date(item.data().registrationTimestamp).toISOString().slice(0, 10)
				      })
				      if(item.data().gender == "female")
					  f++;
				      else if(item.data().gender == "male")
					  m++;
				      avgage += parseInt(new Date().getFullYear()) - item.data().birthDay.slice(0, 4) + 1
				  })
				  respond.summary = {
				      "female" : f,
				      "male" : m,
				      "avgage" : (avgage/(respond.user.length)).toFixed(1)
				  }
				  console.log({"Respond" : respond})
				  return res.send(respond)
			      }
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
	},
	tokenupdate: function(req, res){
	    const work = async () => {
		try{
		    console.log(req.body)
		    var data = req.body; //JSON형태
		    var docid;

		    db.collection('account')
		    .where('serial', '==', data.serial)
		    .get()
		    .then(doc => {
			if (doc.empty)
			    return res.send({
				"result" : false,
				"message" : "No such data"
			    })
			else{
			    doc.forEach(item => {
				docid = item.id
			    })
			    db.collection('account')
			    .doc(docid)
			    .update({
				token : data.token
			    })
			    .then(() => {
				console.log("updated successfully")
				return res.send({
				    "result" : true,
				    "message" : "Update successfully"
				})
			    }, (err) => {
				throw err;
			    });
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
	},
	mgrinforeq: function(req, res){
	    const work = async () => {
		try{
		    var data = req.body; //JSON형태
		    var manager;
		    var data = [];
		    var status = {};
		    var respond = {status, data};

		    db.collection('account')
		    .doc(data.userId)
		    .get()
		    .then( function(querySnapshot){
		      if(!querySnapshot.data()){
			  return res.send({
			      "status" : false,
			      "message" : "No such data"
			  })
		      }

		      else manager = querySnapshot.data().manager

		      db.collection('account')
		      .doc(manager)
		      .get()
		      .then( function(querySnapshot){

			  if(!querySnapshot.data()){
			      return res.send({
				  "status" : false,
				  "message" : "No such data"
			      })
			  }
			  else{
			      respond.data.push({
				  "id" : manager,
				  "name" : querySnapshot.data().name,
				  "gender" : querySnapshot.data().gender,
				  "birthDay" : querySnapshot.data().birthDay,
				  "email" : querySnapshot.data().email
			      })

			      respond.status = "ok"
			      console.log({"Respond" : respond})
			      return res.send(respond)
			  }
		      })
		    })
		} catch(err) {
		    console.log(err);
		    return res.send({
			"status" : false,
			"message" : err
		    })
		}
	    }
	    work();
	},
	getacode : function(req, res){
	    const work = async () => {
	      try{
		  var data = req.body; //JSON형태

		  db.collection('account')
		  .where('serial', '==', data.serial)
		  .get()
		  .then(doc => {
		      if (doc.empty)
			  return res.send({
			      "result" : false,
			      "message" : "No such data"
			  })
		      else{
			  doc.forEach(item => {
			      var respond = {
				  "name" : item.data().name, 
				  "gender" : item.data().gender,
				  "birth" : item.data().birthDay.slice(0, 4) + "-" + item.data().birthDay.slice(4, 6) + "-" + item.data().birthDay.slice(6, 8),
				  "email" : item.data().email
			      }
			      console.log({"Respond" : respond})
			      return res.send(respond)
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
