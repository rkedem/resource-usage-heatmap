import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Resource name is required"],
      trim: true
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true
    },
    location: {
      type: String,
      default: ""
    },
    capacity: {
      type: Number,
      default: 1,
      min: 1
    },
    type: {
      type: String,
      default: "general"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

resourceSchema.index({ name: 1, category: 1 });

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;