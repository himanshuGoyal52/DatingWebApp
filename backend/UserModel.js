import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        index : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    superLikes :{
        type : Array,
    },
    image : {
        type: String,
    },
    blockedUsers : {
        type : [String],
    },
    likedUsers:{
        type:[String],
    }
});
const User = mongoose.model('users',userSchema);

export default User;