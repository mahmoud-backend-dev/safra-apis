import { Schema, model } from "mongoose";

const jobSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  applyJob: [{
    type: Schema.Types.ObjectId,
    ref: "ApplyJob",
  }]
}, { timestamps: true });

jobSchema.pre(/^find/, function (next) {
  this.select("-__v -createdAt -updatedAt");
  next();
});

export default model("Job", jobSchema);