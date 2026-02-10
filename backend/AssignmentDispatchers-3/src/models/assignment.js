import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicles",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authentications",
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },

    fromLocation: {
      type: String,
      required: true,
      trim: true,
    },

    toLocation: {
      type: String,
      required: true,
      trim: true,
    },

    load : {
        type : String,
        required : true
    },

    status: {
      type: String,
      enum: ["scheduled", "assigned", "in_progress", "completed", "cancelled"],
      default: "assigned",
    },
  },
  { timestamps: true },
);

const Assignment = mongoose.model("Assignments", AssignmentSchema);

export default Assignment;
