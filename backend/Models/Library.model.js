import mongoose,{Schema} from "mongoose";

const librarySchema = new Schema({
    userId :{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    bookName:{
        type:String,
        required:true,
    },
    bookDescription:{
        type:String,
        required:true,
    },
    bookUrl:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:'pending',
        required:true,
        enum:['pending','approved','rejected']
    }

},{timestamps:true})

export const Library = mongoose.model('Library',librarySchema)