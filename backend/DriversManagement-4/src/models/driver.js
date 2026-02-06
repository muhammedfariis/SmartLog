import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicle_management",
      required: true,
    },
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignments",
      required: true,
    },
    startKm: {
      type: Number,
      required: true,
    },
    endKm: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const driver = mongoose.model("Drivers", driverSchema);

export default driver;
