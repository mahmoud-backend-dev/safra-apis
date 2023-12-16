import { Schema, model } from 'mongoose';

export const applyJobSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  nationality: {
    type: String,
    required: [true, 'nationality is required'],
  },
  ID:{
    type: Number,
    required: [true, 'ID is required'],
  },
  phone: {
    type: Number,
    required: [true, 'phone is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  academicQualification: {
    type: String,
    required: [true, 'academicQualification is required'],
  },
  imgAcademicQualification: {
    type: String,
    required: [true, 'imgAcademicQualification is required'],
  },
  imgResume: {
    type: String,
    required: [true, 'imgResume is required'],
  },
  imgIdBank: {
    type: String,
    required: [true, 'imgIdBank is required'],
  },
  trainingCourse: {
    type: String,
    required: [true, 'trainingCourse is required'],
  },
  skills: {
    type: String,
    required: [true, 'skills is required'],
  },
  experience: {
    type: String,
    required: [true, 'experience is required'],
  },
}, { timestamps: true });

applyJobSchema.pre(/^find/, function (next) {
  this.select('-__v -createdAt -updatedAt');
  next();
});

export default model('ApplyJob', applyJobSchema);