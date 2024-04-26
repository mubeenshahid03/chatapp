const { type } = require("@testing-library/user-event/dist/type")
const mongoose=require("mongoose")
const userSchema= new mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String,
        unique:true,
    },
    password:{
        required:true,
        type:String,
    },
    socketId:{
        type:String
    }


})

const User= mongoose.model('User',userSchema,'users')
module.exports=User