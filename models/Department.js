import { Schema, model } from "mongoose";

const departmentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name required'],
    unique:[true,'name unique'],
  },
  programs: [{
    type: Schema.Types.ObjectId,
    ref: 'Program'
  }]
}, { timestamps: true });

departmentSchema.set('strictPopulate', false);

departmentSchema.pre(/^find/, function (next) {
  this.select("-__v -createdAt -updatedAt");
  next()
});

export default model('Department', departmentSchema);