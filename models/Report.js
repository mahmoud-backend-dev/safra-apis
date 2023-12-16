import { Schema, model } from "mongoose";

const noTitleSchema = new Schema({
  name: {
    type: String,
  },
  link: {
    type: String,
  }
});

const oneTitleSchema = new Schema({
  subTitle: {
    type: String,
  },
  arrOfPDFs: [{
    name: {
      type: String,
    },
    link: {
      type: String,
    }
  }]
});

const reportSchema = new Schema({
  mainTitle: {
    type: String,
    required: [true, 'mainName required'],
  },
  category: {
    type: String,
    enum:['G','R'],
    required: [true, 'category required and must be G or R'],
  },
  noTitle: [noTitleSchema],
  oneTitle: [oneTitleSchema],
}, { timestamps: true });

reportSchema.pre(/^find/, function (next) {
  this.select("-__v -createdAt -updatedAt");
  next()
});

export default model('Report', reportSchema);