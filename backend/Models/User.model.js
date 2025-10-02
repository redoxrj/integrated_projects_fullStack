import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName :{
        type:String,
        required:true,
    },
    username :{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
    },
    email :{
        type:String,
        required:true,
        unique:true,
    },
    password :{
        type:String,
        required:[true,'password de bhai!'],
    },
    avatar :{
        type:String,
    },
    refreshToken :{
        type:String,
    },
    role :{
        type:String,
        default: 'user'
    },

},{timestamps:true})

export const User= mongoose.model('User',userSchema)