import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import LandingPage from "../models/LandingPage.js";
import NotFoundError from "../errors/notFound.js";
import { unlink } from 'fs/promises';

export const addSectionOne = asyncHandler(async (req, res) => {
  const sectionOne = await LandingPage.findOne({});
  req.body.image = `${process.env.BASE_URL}/landing-page/section-one/${req.file.filename}`;
  if (!sectionOne) {
    const newSectionOne = await LandingPage.create({ sectionOne: req.body });
    return res.status(StatusCodes.CREATED).json({ data: newSectionOne });
  }
  sectionOne.sectionOne.push(req.body);
  await sectionOne.save();
  return res.status(StatusCodes.CREATED)
    .json({ data: sectionOne.sectionOne[sectionOne.sectionOne.length - 1] });
});

export const updateSectionOne = asyncHandler(async (req, res) => {
  const sectionOne = await LandingPage.findOne({});
  const index = sectionOne.sectionOne.findIndex((ele) => ele._id.toString() === req.params.id)
  if (req.file) {
    await unlink(`./uploads/landing-page/section-one/${sectionOne.sectionOne[index].image.split('/').pop()}`);
    req.body.image = `${process.env.BASE_URL}/landing-page/section-one/${req.file.filename}`;
    sectionOne.sectionOne[index].image = req.body.image
  }
  if(req.body.link)
    sectionOne.sectionOne[index].link = req.body.link
  await sectionOne.save();
  res.status(StatusCodes.OK).json({
    status: "Success",
    data: sectionOne.sectionOne[index]
  })
})

export const deleteFromSectionOne = asyncHandler(async (req, res) => {
  const sectionOne = await LandingPage.findOne({});
  if (!sectionOne) {
    throw new NotFoundError('landing page not found');
  };
  const index = sectionOne.sectionOne.findIndex((value) => value._id.toString() === req.params.id);
  await unlink(`./uploads/landing-page/section-one/${sectionOne.sectionOne[index].image.split('/').pop()}`);
  sectionOne.sectionOne.splice(index, 1);
  await sectionOne.save();
  return res.status(StatusCodes.OK).json({ data: sectionOne.sectionOne });
});

export const getSectionOne = asyncHandler(async (req, res) => {
  const sectionOne = await LandingPage.findOne({});
  if (!sectionOne) {
    throw new NotFoundError('landing page not found');
  };
  return res.status(StatusCodes.OK).json({ data: sectionOne.sectionOne });
});

export const addSectionThree = asyncHandler(async (req, res) => {
  const sectionThree = await LandingPage.findOne({});
  if (!sectionThree) {
    const newSectionThree = await LandingPage.create({ sectionThree: req.body });
    return res.status(StatusCodes.CREATED).json({ data: newSectionThree });
  }
  sectionThree.sectionThree.push(req.body);
  await sectionThree.save();
  return res.status(StatusCodes.CREATED)
    .json({ data: sectionThree.sectionThree[sectionThree.sectionThree.length - 1] });
});

export const updateSectionThree = asyncHandler(async (req, res) => {
  const sectionThree = await LandingPage.findOne({});
  const { date, title } = req.body;
  const index = sectionThree.sectionThree.findIndex((ele) => ele._id.toString() === req.params.id);
  if (date)
    sectionThree.sectionThree[index].date = date;
  if (title)
    sectionThree.sectionThree[index].title = title;
  await sectionThree.save();
  res.status(StatusCodes.OK).json({
    status: "Success",
    data: sectionThree.sectionThree[index]
  })
});

export const deleteFromSectionThree = asyncHandler(async (req, res) => {
  const sectionThree = await LandingPage.findOne({});
  if (!sectionThree) {
    throw new NotFoundError('landing page not found');
  };
  const index = sectionThree.sectionThree.findIndex((value) => value._id.toString() === req.params.id);
  sectionThree.sectionThree.splice(index, 1);
  await sectionThree.save();
  return res.status(StatusCodes.OK).json({ data: sectionThree.sectionThree });
});

export const getSectionThree = asyncHandler(async (req, res) => {
  const sectionThree = await LandingPage.findOne({});
  if (!sectionThree) {
    throw new NotFoundError('landing page not found');
  };
  return res.status(StatusCodes.OK).json({ data: sectionThree.sectionThree });
});

export const addSectionFour = asyncHandler(async (req, res) => {
  const sectionFour = await LandingPage.findOne({});
  const { title, name, link, form } = req.body;
  if (!sectionFour) {
    const newSectionFour = await LandingPage.create({
      sectionFour: {
        title,
        arr: [{ name, link, form }]
      }
    });
    return res.status(StatusCodes.CREATED).json({ data: newSectionFour });
  }
  sectionFour.sectionFour.push({ title, arr: [{ name, link, form }] });
  await sectionFour.save();
  return res.status(StatusCodes.CREATED)
    .json({ data: sectionFour.sectionFour[sectionFour.sectionFour.length - 1] });
});

export const addArrSectionFour = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const { name, link, form } = req.body;
  const sectionFour = await LandingPage.findOne({});
  const index = sectionFour.sectionFour.findIndex((value) => value._id.toString() === id);
  sectionFour.sectionFour[index].arr.push({ name, link, form });
  await sectionFour.save();
  return res.status(StatusCodes.CREATED)
    .json({ data: sectionFour.sectionFour[index].arr[sectionFour.sectionFour[index].arr.length - 1] });
});

export const updateEleFromSectionFour = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const { title } = req.body;
  const sectionFour = await LandingPage.findOne({});
  const index = sectionFour.sectionFour.findIndex((value) => value._id.toString() === id);
  if (title) {
    sectionFour.sectionFour[index].title = title;
  }
  await sectionFour.save();
  return res.status(StatusCodes.OK)
    .json({ data: { title: sectionFour.sectionFour[index].title } });
});

export const updateArrFromSectionFour = asyncHandler(async (req, res) => {
  const { id, idArr } = req.query;
  const { name, link, form } = req.body;
  const sectionFour = await LandingPage.findOne({});
  const index = sectionFour.sectionFour.findIndex((value) => value._id.toString() === id);
  const indexArr = sectionFour.sectionFour[index].arr.findIndex((value) => value._id.toString() === idArr);
  if (name) {
    sectionFour.sectionFour[index].arr[indexArr].name = name;
  }
  if (link) {
    sectionFour.sectionFour[index].arr[indexArr].link = link;
  }
  if (form) {
    sectionFour.sectionFour[index].arr[indexArr].form = form;
  }
  await sectionFour.save();
  return res.status(StatusCodes.OK).json({ data: sectionFour.sectionFour[index].arr[indexArr] });
})

export const deleteFromSectionFour = asyncHandler(async (req, res) => {
  const { id, idArr } = req.query;
  const sectionFour = await LandingPage.findOne({});
  const index = sectionFour.sectionFour.findIndex((value) => value._id.toString() === id);
  const indexArr = sectionFour.sectionFour[index].arr.findIndex((value) => value._id.toString() === idArr);
  sectionFour.sectionFour[index].arr.splice(indexArr, 1);
  await sectionFour.save();
  return res.status(StatusCodes.OK).json({ data: sectionFour.sectionFour[index] });
});

export const deleteEleFromSectionFour = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const sectionFour = await LandingPage.findOne({});
  const index = sectionFour.sectionFour.findIndex((value) => value._id.toString() === id);
  sectionFour.sectionFour.splice(index, 1);
  await sectionFour.save();
  return res.status(StatusCodes.OK).json({ data: sectionFour.sectionFour });
})

export const getSectionFour = asyncHandler(async (req, res) => {
  const sectionFour = await LandingPage.findOne({});
  if (!sectionFour) {
    throw new NotFoundError('landing page not found');
  };
  return res.status(StatusCodes.OK).json({ data: sectionFour.sectionFour });
})

export const addSectionFive = asyncHandler(async (req, res) => {
  const sectionFive = await LandingPage.findOne({});
  
  req.body.image = `${process.env.BASE_URL}/landing-page/section-five/${req.file.filename}`;
  if (!sectionFive) {
    const newSectionFive = await LandingPage.create({ sectionFive: req.body });
    return res.status(StatusCodes.CREATED).json({ data: newSectionFive });
  }
  sectionFive.sectionFive.push(req.body);
  await sectionFive.save();
  return res.status(StatusCodes.CREATED)
    .json({ data: sectionFive.sectionFive[sectionFive.sectionFive.length - 1] });
});

export const deleteFromSectionFive = asyncHandler(async (req, res) => {
  const sectionFive = await LandingPage.findOne({});
  if (!sectionFive) {
    throw new NotFoundError('landing page not found');
  };
  const index = sectionFive.sectionFive.findIndex((value) => value._id.toString() === req.params.id);
  if (sectionFive.sectionFive[index].image) {
    await unlink(`./uploads/landing-page/section-five/${sectionFive.sectionFive[index].image.split('/').pop()}`);
  }
  sectionFive.sectionFive.splice(index, 1);
  await sectionFive.save();
  return res.status(StatusCodes.OK).json({ data: sectionFive.sectionFive });
});

export const getSpecificSectionFive = asyncHandler(async (req, res) => {
  const sectionFive = await LandingPage.findOne({});
  if (!sectionFive) {
    throw new NotFoundError('landing page not found');
  };
  const index = sectionFive.sectionFive.findIndex((value) => value._id.toString() === req.params.id);
  return res.status(StatusCodes.OK).json({ data: sectionFive.sectionFive[index] });
})

export const updateSectionFive = asyncHandler(async (req, res) => {
  const sectionFive = await LandingPage.findOne({});
  if (!sectionFive) {
    throw new NotFoundError('landing page not found');
  };
  const index = sectionFive.sectionFive.findIndex((value) => value._id.toString() === req.params.id);
  if (req.file) {
    await unlink(`./uploads/landing-page/section-five/${sectionFive.sectionFive[index].image.split('/').pop()}`);
    req.body.image = `${process.env.BASE_URL}/landing-page/section-five/${req.file.filename}`;
  }
  if(req.body.image) {
    sectionFive.sectionFive[index].image = req.body.image;
  }
  if (req.body.name) {
    sectionFive.sectionFive[index].name = req.body.name;
  }
  if (req.body.jobTitle) {
    sectionFive.sectionFive[index].jobTitle = req.body.jobTitle;
  }
  if (req.body.description) {
    sectionFive.sectionFive[index].description = req.body.description;
  }
  await sectionFive.save();
  return res.status(StatusCodes.OK).json({ data: sectionFive.sectionFive[index] });
})

export const getSectionFive = asyncHandler(async (req, res) => {
  const sectionFive = await LandingPage.findOne({});
  if (!sectionFive) {
    throw new NotFoundError('landing page not found');
  };
  return res.status(StatusCodes.OK).json({ data: sectionFive.sectionFive });
});

export const addSectionSix = asyncHandler(async (req, res) => {
  const sectionSix = await LandingPage.findOne({});
  req.body.image = `${process.env.BASE_URL}/landing-page/section-six/${req.file.filename}`;
  if (!sectionSix) {
    const newSectionSix = await LandingPage.create({ sectionSix: req.body });
    return res.status(StatusCodes.CREATED).json({ data: newSectionSix });
  }
  sectionSix.sectionSix.push(req.body);
  await sectionSix.save();
  return res.status(StatusCodes.CREATED)
    .json({ data: sectionSix.sectionSix[sectionSix.sectionSix.length - 1] });
});

export const updateSectionSix = asyncHandler(async (req, res) => {
  const sectionSix = await LandingPage.findOne({});
  const index = sectionSix.sectionSix.findIndex((value) => value._id.toString() === req.params.id);
  if (req.file) {
    await unlink(`./uploads/landing-page/section-six/${sectionSix.sectionSix[index].image.split('/').pop()}`);
    req.body.image = `${process.env.BASE_URL}/landing-page/section-six/${req.file.filename}`;
    sectionSix.sectionSix[index].image = req.body.image;
  }
  if (req.body.title) {
    sectionSix.sectionSix[index].title = req.body.title;
  }
  await sectionSix.save();
  return res.status(StatusCodes.OK)
    .json({ status: "Success", data: sectionSix.sectionSix[index] });
})

export const deleteFromSectionSix = asyncHandler(async (req, res) => {
  const sectionSix = await LandingPage.findOne({});
  if (!sectionSix) {
    throw new NotFoundError('landing page not found');
  };
  const index = sectionSix.sectionSix.findIndex((value) => value._id.toString() === req.params.id);
  await unlink(`./uploads/landing-page/section-six/${sectionSix.sectionSix[index].image.split('/').pop()}`);
  sectionSix.sectionSix.splice(index, 1);
  await sectionSix.save();
  return res.status(StatusCodes.OK).json({ data: sectionSix.sectionSix });
});

export const getSectionSix = asyncHandler(async (req, res) => {
  const sectionSix = await LandingPage.findOne({});
  if (!sectionSix) {
    throw new NotFoundError('landing page not found');
  };
  return res.status(StatusCodes.OK).json({ data: sectionSix.sectionSix });
});

export const addSectionSeven = asyncHandler(async (req, res) => {
  const sectionSeven = await LandingPage.findOne({});
  if (!sectionSeven) {
    const newSectionSeven = await LandingPage.create({ sectionSeven: req.body });
    return res.status(StatusCodes.CREATED).json({ data: newSectionSeven.sectionSeven });
  }
  sectionSeven.sectionSeven.push(req.body);
  await sectionSeven.save();
  return res.status(StatusCodes.CREATED)
    .json({ data: sectionSeven.sectionSeven[sectionSeven.sectionSeven.length - 1] });
});

export const updateSectionSeven = asyncHandler(async (req, res) => {
  const sectionSeven = await LandingPage.findOne({});
  const index = sectionSeven.sectionSeven.findIndex((value) => value._id.toString() === req.params.id);
  if (req.body.link) {
    sectionSeven.sectionSeven[index].link = req.body.link;
  }
  await sectionSeven.save();
  return res.status(StatusCodes.OK)
    .json({ status: "Success", data: sectionSeven.sectionSeven[index] });
})

export const deleteFromSectionSeven = asyncHandler(async (req, res) => {
  const sectionSeven = await LandingPage.findOne({});
  const index = sectionSeven.sectionSeven.findIndex((value) => value._id,toString() === req.params.id);
  sectionSeven.sectionSeven.splice(index, 1);
  await sectionSeven.save();
  return res.status(StatusCodes.OK).json({ data: sectionSeven.sectionSeven });
});

export const getSectionSeven = asyncHandler(async (req, res) => {
  const sectionSeven = await LandingPage.findOne({});
  if (!sectionSeven) {
    throw new NotFoundError('landing page not found');
  };
  return res.status(StatusCodes.OK).json({ data: sectionSeven.sectionSeven });
});

export const getLandingPage = asyncHandler(async (req, res) => {
  const landingPage = await LandingPage.findOne({});
  if (!landingPage) {
    throw new NotFoundError('landing page not found');
  };
  return res.status(StatusCodes.OK).json({ data: landingPage });
});