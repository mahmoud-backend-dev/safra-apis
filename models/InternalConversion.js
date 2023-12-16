import { Schema, model } from 'mongoose';

const InternalConversionSchema = new Schema({
  name:{
    type: String,
    required: [true,'name required']
  },
  email:{
    type: String,
    required: [true,'email required']
  },
  ID: {
    type: Number,
    required: [true,'ID required']
  },
  academicNumber: {
    type: Number,
    required: [true,'academicNumber required']
  },
  seamsterYear: {
    type: String,
    required: [true,'seamsterYear required']
  },
  academicYear: {
    type: Number,
    required: [true,'academicYear required']
  },
  priceOfInternalConversion: {
    type: Number,
    required: [true,'priceOfInternalConversion required']
  },
  priceOfSeamsterInternalConversion: {
    type: String,
    required: [true,'priceOfSeamsterInternalConversion required']
  },
  educationalPath: {
    type: String,
    required: [true,'educationalPath required']
  },
  to: {
    type: String,
    required: [true,'to required']
  },
  location: {
    type: String,
    required: [true,'location required']
  },
  reason: {
    type: String,
    required: [true,'reason required']
  },
  phone: {
    type: Number,
    required: [true,'phone required']
  },
  imageId: String,
  paymentReceiptImage: String,
}, { timestamps: true });

export default model('InternalConversion', InternalConversionSchema);