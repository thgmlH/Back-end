var firebase_controller = require('./firebase_controller.js')
var firebase_rdb_controller = require('./firebase_rdb_controller.js')
const express = require('express');
var router = express.router();

router.post('/dataAdd', firebase_controller.dataAdd)

router.post('/dataDelete', firebase_controller.dataDelete)

router.get('/dataUpdate', firebase_controller.dataUpdate)

router.post('/dataSearch', firebase_controller.dataSearch)

router.post('/returnuserinfo', firebase_controller.returnuserinfo)

router.post('/login', firebase_controller.login)

router.post('/pushsend', firebase_controller.pushsend)

router.post('/confirminsert', firebase_controller.confirminsert)

router.post('/getagency', firebase_controller.getagency)

router.post('/getlist', firebase_controller.getlist)

router.post('/tokenupdate', firebase_controller.tokenupdate)

router.post('/mgrInfoReq', firebase_controller.mgrinforeq)

router.post('/getacode', firebase_controller.getacode)

router.post('/acodelist', firebase_rdb_controller.acodelist)

router.post('/detaillist', firebase_rdb_controller.detaillist)

router.post('/deletePadAgencyInfoReq', firebase_rdb_controller.deletepadagency)

module.exports = router
