import { connect } from 'http2';
import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';

const connectDB = async ()=> {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDb Connected');   

}

var Schema = mongoose.Schema;

var createSchema = new mongoose.Schema({
    user_id: String,
    pw: String
});

// 모델 생성
const User = mongoose.model("User", createSchema);

export {connectDB, createSchema};
