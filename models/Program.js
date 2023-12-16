import { Schema, model } from "mongoose";

const programSchema = new Schema({
  ID: {
    type: Number,
    required: [true, 'ID required'],
    unique:[true,'ID unique'],
  },
  name: {
    type: String,
    required: [true, 'name required'],
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'department required'],
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref:'Student'
  }]
}, { timestamps: true });

programSchema.set('strictPopulate', false);

programSchema.pre(/^find/, function (next) {
  this.select("-__v -createdAt -updatedAt");
  next()
});

export default model('Program', programSchema);