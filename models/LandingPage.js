
import { Schema, model } from "mongoose";

export const sectionOne = new Schema({
  image: {
    type: String,
    required: [true, 'image required'],
  },
  link: String,
});

export const sectionThree = new Schema({
  date: {
    type: String,
    required: [true, 'date required'],
  },
  title: {
    type: String,
    required: [true, 'title required'],
  },
});

export const sectionFour = new Schema({
  title: {
    type: String,
    required: [true, 'title required'],
  },
  arr: [{
    name: {
      type: String,
    },
    link: {
      type: String,
      required: [true, 'link required'],
    },
    form: {
      type: String,
    }
  }]
})

export const sectionFive = new Schema({
  name: {
    type: String,
    required: [true, 'name required'],
  },
  jobTitle: {
    type: String,
    required: [true, 'jobTitle required'],
  },
  description: {
    type: String,
    required: [true, 'description required'],
  },
  image: String,
})

export const sectionSix = new Schema({
  title: {
    type: String,
    required: [true, 'title required'],
  },
  image: {
    type: String,
    required: [true, 'image required'],
  },
});

export const sectionSeven = new Schema({
  link: {
    type: String,
    required: [true, 'link required'],
  },
});

export const landingPageSchema = new Schema({
  sectionOne: [sectionOne],
  sectionThree: [sectionThree],
  sectionFour: [sectionFour],
  sectionFive: [sectionFive],
  sectionSix: [sectionSix],
  sectionSeven: [sectionSeven],
}, { timestamps: true });


landingPageSchema.pre(/^find/, function (next) {
  this.select("-__v -createdAt -updatedAt");
  next()
});

export default model('LandingPage', landingPageSchema);