import mongoose from "mongoose";

const usageEventSchema = new mongoose.Schema(
  {
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: [true, "resourceId is required"]
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    startTime: {
      type: Date,
      required: [true, "startTime is required"]
    },
    endTime: {
      type: Date,
      required: [true, "endTime is required"]
    },
    source: {
      type: String,
      default: "manual"
    },
    notes: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

usageEventSchema.pre("validate", function (next) {
  if (this.startTime && this.endTime && this.endTime <= this.startTime) {
    return next(new Error("endTime must be greater than startTime"));
  }
  next();
});

usageEventSchema.index({ resourceId: 1, startTime: 1, endTime: 1 });

const UsageEvent = mongoose.model("UsageEvent", usageEventSchema);

export default UsageEvent;