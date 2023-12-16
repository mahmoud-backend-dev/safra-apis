import { Schema, model } from "mongoose";
const externalConversionSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  nationality: {
    type: String,
    required: [true,"nationality is required"],
  },
  ID: {
    type: Number,
    required: [true,"ID is required"],
  },
  association: {
    type: String,
    required: [true,"association is required"],
  },
  seamsterYear: {
    type: String,
    required: [true,"seamsterYear is required"],
  },
  academicYear: {
    type: Number,
    required: [true,"academicYear is required"],
  },
  from: {
    type: String,
    required: [true,"from is required"],
  },
  to: {
    type: String,
    required: [true,"to is required"],
  },
  reason: {
    type: String,
    required: [true,"reason is required"],
  },
  phone: {
    type: Number,
    required: [true,"phone is required"],
  },
  location: {
    type: String,
    required: [true,"location is required"],
  },
  
  imageId: String,
  previousCertificateImage: String,
  academicIdImage: String,
  paymentReceiptImage: String,
}, { timestamps: true });

externalConversionSchema.pre(/^find/, function (next) {
  this.select("-__v -createdAt -updatedAt");
  next()
});

export default model('ExternalConversion', externalConversionSchema);