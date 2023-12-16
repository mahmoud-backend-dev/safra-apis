import { Schema, model } from "mongoose";

const delayStudySchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  educationalPath: {
    type: String,
    required: [true, "educationalPath is required"],
  },
  ID: {
    type: Number,
    required: [true, "ID is required"],
  },
  numAcademic: {
    type: Number,
    required: [true, "numAcademic is required"],
  },
  seamsterYear: {
    type: String,
    required: [true, "seamsterYear is required"],
  },
  academicYear: {
    type: Number,
    required: [true, "academicYear is required"],
  },
  priceOfDelay: {
    type: Number,
    required: [true, "priceOfDelay is required"],
  },
  seamsterPaymentName: {
    type: String,
    required: [true, "seamsterPaymentName is required"],
  },
  nameSeamsterOfDelay: {
    type: String,
    required: [true, "nameSeamsterOfDelay is required"],
  },
  nameAcademicOfDelay: {
    type: Number,
    required: [true, "nameAcademicOfDelay is required"],
  },
  twoYears: {
    type: String,
    required: [true, "twoYears is required"],
  },
  reason: {
    type: String,
    required: [true, "reason is required"],
  },
  phone: {
    type: Number,
    required: [true, "phone is required"],
  },
  imageId: String,
  proveImage: String,
  paymentReceiptImage: String,
}, { timestamps: true });

delayStudySchema.pre(/^find/, function (next) {
  this.select("-__v -createdAt -updatedAt");
  next()
});

export default model('DelayStudy', delayStudySchema);