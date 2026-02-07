import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    NumberPlate: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    vehicle: {
      type: String,
      enum: ["truck", "minitruck", "van", "container"],
      required: true,     
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

 
    status: {
      type: String,
      enum: ["Active", "Maintainance", "In-Transist", "Retired"],
      default: "Active",
    },

    CurrentKm: {
      type: Number,
      default: 0,
    },

    Service: {
      type: Number,
      required: true,
    },

    insurance: {
      type: Date,
      required: true,
    },

    polution: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const vehicles = mongoose.model("vehicles", schema);

export default vehicles;
