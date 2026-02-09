import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  { 

    Name : {
      type : String,
      
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "dispatcher", "driver"],
    },
     LicenceInfo : {
        type : String,
        unique : true,
        sparse : true
    }
  },
  { timestamps: true }
);

const Auth = mongoose.model("authentications", AuthSchema);

export default Auth;
