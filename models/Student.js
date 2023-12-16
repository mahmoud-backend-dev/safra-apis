import { Schema, model } from "mongoose";

const programSchema = new Schema({
  _id: false,
  id: {
    type: Schema.Types.ObjectId,
    ref:'Program'
  },
  programId: {
    type: Number,
    required: [true,'programId required']
  },
  degree: {
    type: Number,
    required: [true, 'degree required']
  },
  evaluation: {
    type: String,
    required: [true, 'evaluation required'],
    enum: [
      'ممتاز مرتفع',
      'ممتاز',
      'جيد جداً مرتفع',
      'جيد جداً',
      'جيد مرتفع',
      'جيد',
      'مقبول مرتفع',
      'مقبول',
      'راسب'
    ]
  },
  file: String,
}) 

const studentSchema = new Schema({
  ID: {
    type: Number,
    required: [true, 'ID required'],
    unique: [true, 'ID unique']
  },
  name: {
    type: String,
    required: [true, 'name required']
  },
  programs: [programSchema],
}, { timestamps: true });

studentSchema.set('strictPopulate', false);

studentSchema.pre(/^find/, function (next) {
  this.select("-__v -createdAt -updatedAt");
  next()
});

export default model('Student', studentSchema);