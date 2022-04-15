//요청 매개 변수 확인, 쿼리, 올바른 코드로 응답 보내기 등 로직을 처리
var UserService = require('./service.js')

exports.insertUsers = async function (req, res, next) {
    //add data

    console.log(req.body)
    var query = req.body.query;
    try {
        var users = await UserService.insertUsers(query)
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Inserted in User" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getUsers = async function (req, res, next) {
    //get all data

    try {
        var users = await UserService.getUsers()
        return res.status(200).json({ status: 200, data: users, message: "Succesfully User Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteUsers = async function (req, res, next) {
    //delete data

    console.log(req.body)
    var query = req.body.query;
    try {
        var users = await UserService.deleteUsers(query)
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Deleted user" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateUsers = async function (req, res, next) {
    //delete data

    console.log(req.body)
    var query = req.body.query;
    try {
        var users = await UserService.updateUsers(query)
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Udated user" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}