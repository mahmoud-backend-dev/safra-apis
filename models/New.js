import { Schema, model } from "mongoose";

const newSchema = new Schema({
  date: {
    type: Date,
    required: [true, 'date required'],
  },
  title: {
    type: String,
    required: [true, 'title required'],
  },
  image: {
    type: String,
    required: [true, 'image required'],
  },
  description: {
    type: String,
    required: [true, 'description required'],
  },
  type: {
    type: String,
    required: [true, 'type required'],
    enum: ["الإنجازات", "أكاديمي", "مشاركات", "فعاليات"]
  },
}, { timestamps: true });

newSchema.pre(/^find/, function (next) {
  this.select("-__v -createdAt -updatedAt");
  next()
});

export default model('New', newSchema);