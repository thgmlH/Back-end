var User = require('./mongodb.js')
//데이터베이스 쿼리와 반환 객체 또는 오류 발생 처리

exports.insertUsers = async function (query) {

    try {
        var user = new User(query)
        
        user.save(function (err, book) {
            if (err) return console.error(err);
            console.log(user.name + " saved to User collection");
        });
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating User')
    }
}

exports.getUsers = async function (query) {

    try {
        var user =  User.find()

        return user;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating User')
    }
}

exports.deleteUsers = async function (query) {

    try {
        var user =  User.deleteOne({name : query.name})

        return user;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating User')
    }
}

exports.updateUsers = async function (query) {

    try {
        var user =  await User.findById(query._id);

        console.log(user)
        user.name = query.name;
        user.age = query.age;

        var result = await user.save(function (err, book) {
            if (err) return console.error(err);
            console.log("Updated to User collection");
        });
        return result;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating User')
    }
}