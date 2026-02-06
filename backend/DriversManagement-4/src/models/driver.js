
import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
   
    assignmentId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
    },
    startKm : {
        type : Number,
        required : true 
    },
    endKm : {
        type : Number,
        required : true 
    }

},{timestamps:true})

const driver = mongoose.model("Drivers" , driverSchema)

export default driver 