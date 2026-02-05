import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({ 
    Name : {
        type : String,
        required : true
    },
    UserName : {
        type : String,
        required : true,
        unique : true
    },
    Password : {
        type : String , 
        required : true
    },

    role : {
        type : String,
        required : true ,
        enum : ["admin" , "dispatcher" , "driver"]
    },

    LicenceInfo : {
        type : String,
        unique : true
    }


} , {timestamps : true})

const Users = mongoose.model("dispatchers" , UserSchema)

export default Users