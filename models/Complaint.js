import { Schema, model } from 'mongoose';

const complaintSchema = new Schema({
  name: {
    type:String,
  },
  email: {
    type:String,
  },
  class: {
    type: String,
    required: [true, 'class is required'],
    enum: ['طالب', 'أستاذ', 'إدارى', 'غير ذلك'],
  },
  location: {
    type: String,
    required: [true, 'location is required'],
  },
  complaint: {
    type: String,
    required: [true,'complaint is required'],
  }
}, { timestamps: true });

complaintSchema.pre(/^find/, function (next) {
  this.select('-__v -createdAt -updatedAt');
  next();
});

export default model('Complaint', complaintSchema);