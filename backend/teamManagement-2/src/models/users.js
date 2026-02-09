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

   


} , {timestamps : true})

const Users = mongoose.model("Users" , UserSchema)

export default Users