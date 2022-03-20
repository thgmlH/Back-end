// express 프레임워크
const express = require('express');
var { Observable } = require('rxjs');
const router = express.Router();

// firebase Admin 써드파티 미들웨어 
var admin = require("firebase-admin");
var { getDatabase } = require("firebase-admin/database");
var { ref, child, get } = require("firebase/database");
var serviceAccount;

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),  
  databaseURL: ""
}, "DB");

var db = app.firestore()
var rtdb = getDatabase(app);

    //데이터 추가 
    //var data = params.data;
    router.post('/dataAdd', function(req, res, next){    

        const work = async () => {
            try{
                var body = req.body; //JSON형태

                db.collection(body.coll)
                .add({
                    name : body.name,
                    email : body.email,
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
    })

    //데이터 삭제
    router.post('/dataDelete', function(req, res, next){

        const work = async () => {
            try{
                var body = req.body;

                //userData에서 collection, doc로 조회해서 delete
                db.collection(body.coll)
                .doc(body.doc)
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
    })

    //데이터 갱신
    router.get('/dataUpdate', function(req, res, next){

        const work = async () => {
            try{
                var body = req.body; //JSON형태

                db.collection(body.coll)
                .doc(body.doc)
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
    })

    router.post('/dataSearch', function(req, res, next){    

        const work = async () => {
            try{
                var body = req.body; //JSON형태
                var respond = [];

                //var respond = 
                db.collection('account')
                .where('name', '==', body.name)
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
                                "email" : item.data().email,
                                "docid" : item.id
                            })
                        });
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
    })

module.exports = router
