import { Schema, model } from "mongoose";

const withdrawalRequestSchema = new Schema({
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
  priceOfWithdrawalRequest: {
    type: Number,
    required: [true, "priceOfWithdrawalRequest is required"],
  },
  seamsterPaymentName: {
    type: String,
    required: [true, "seamsterPaymentName is required"],
  },
  nameSeamsterOfWithdrawal: {
    type: String,
    required: [true, "nameSeamsterOfWithdrawal is required"],
  },
  nameAcademicOfWithdrawal: {
    type: Number,
    required: [true, "nameAcademicOfWithdrawal is required"],
  },
  phone: {
    type: Number,
    required: [true, "phone is required"],
  },
  reason: {
    type: String,
    required: [true, "reason is required"],
  },
  imageId: String,
  proveImage: String,
  paymentReceiptImage: String,
  bankIdImage: String,
}, { timestamps: true });

withdrawalRequestSchema.pre(/^find/, function (next) {
  this.select("-__v -createdAt -updatedAt");
  next()
});

export default model('WithdrawalRequest', withdrawalRequestSchema);