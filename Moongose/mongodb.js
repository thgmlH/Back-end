//스키마 정의 
var mongoose = require('mongoose')

const UserSchema  = new mongoose.Schema({
        name: String,
        age : Number
    },
    { 
        collection: 'User',
        versionKey: false
    }
)

const User = mongoose.model('User', UserSchema)

module.exports = User;