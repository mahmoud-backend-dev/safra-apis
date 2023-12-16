import { body, param, query } from 'express-validator';
import validatorMiddleWare from '../../middleware/validatorMiddleware.js';
import LandingPage from '../../models/LandingPage.js';
import NotFoundError from '../../errors/notFound.js'

export const addSectionOneValidator = [
  body('image').custom((val, { req }) => {
    if (!req.file) {
      throw new Error('image required');
    }
    return true;
  }),
  validatorMiddleWare
];

export const deleteFromSectionOneValidator = [
  param('id').custom(async (val, { req }) => {
    const sectionExits = await LandingPage.findOne({});
    if (!sectionExits) {
      throw new NotFoundError('landing page not found');
    }
    const index = sectionExits.sectionOne.findIndex((value) => value._id.toString() === val);
    if (index === -1) {
      throw new NotFoundError('section one not found');
    }
    return true;
  }),
  validatorMiddleWare
];

export const addSectionThreeValidator = [
  body('date').isString().withMessage('date required'),
  body('title').isString().withMessage('title required'),
  validatorMiddleWare
];

export const deleteFromSectionThreeValidator = [
  param('id').custom(async (val, { req }) => {
    const sectionExits = await LandingPage.findOne({});
    if (!sectionExits) {
      throw new NotFoundError('landing page not found');
    }
    const index = sectionExits.sectionThree.findIndex((value) => value._id.toString() === val);
    if (index === -1) {
      throw new NotFoundError('section three not found');
    }
    return true;
  }),
  validatorMiddleWare
];

export const addSectionFourValidator = [
  body('title').isString().withMessage('name required'),
  body('link').isString().withMessage('link required'),
  validatorMiddleWare,
];

export const addArrSectionFourValidator = [
  query('id').isString().withMessage('id required')
    .custom(async (val, { req }) => {
      const sectionExits = await LandingPage.findOne({});
      if (!sectionExits) {
        throw new NotFoundError('landing page not found');
      }
      const index = sectionExits.sectionFour.findIndex((value) => value._id.toString() === val);
      if (index === -1) {
        throw new NotFoundError('section four not found');
      }
      return true;
    }),
  body('link').isString().withMessage('link required'),
  validatorMiddleWare,
]

export const updateSectionFourValidator = [
  query('id').isString().withMessage('id required')
    .custom(async (val, { req }) => {
      const sectionExits = await LandingPage.findOne({});
      if (!sectionExits) {
        throw new NotFoundError('landing page not found');
      }
      const index = sectionExits.sectionFour.findIndex((value) => value._id.toString() === val);
      if (index === -1) {
        throw new NotFoundError('section four not found');
      }
      return true;
    }),
  query('idArr').isString().withMessage('idArr required')
    .custom(async (val, { req }) => {
      const sectionExits = await LandingPage.findOne({});
      if (!sectionExits) {
        throw new NotFoundError('landing page not found');
      }
      const index = sectionExits.sectionFour.findIndex((value) => value._id.toString() === req.query.id);
      if (index === -1) {
        throw new NotFoundError('section four not found');
      }
      const indexArr = sectionExits.sectionFour[index].arr.findIndex((value) => value._id.toString() === val);
      if (indexArr === -1) {
        throw new NotFoundError('section four not found');
      }
      return true;
    }),
  validatorMiddleWare,
]

export const deleteEleFromSectionFourValidator = [
  query('id').isString().withMessage('id required')
    .custom(async (val, { req }) => {
      const sectionExits = await LandingPage.findOne({});
      if (!sectionExits) {
        throw new NotFoundError('landing page not found');
      }
      const index = sectionExits.sectionFour.findIndex((value) => value._id.toString() === val);
      if (index === -1) {
        throw new NotFoundError('section four not found');
      }
      return true;
    }),
  validatorMiddleWare,
]

export const addSectionFiveValidator = [
  body('name').isString().withMessage('name required'),
  body('jobTitle').isString().withMessage('jobTitle required'),
  body('description').isString().withMessage('description required'),
  body('image').custom((val, { req }) => {
    if (!req.file) {
      throw new Error('image required');
    }
    return true;
  }),
  validatorMiddleWare
];

export const deleteFromSectionFiveValidator = [
  param('id').custom(async (val, { req }) => {
    const sectionExits = await LandingPage.findOne({});
    if (!sectionExits) {
      throw new NotFoundError('landing page not found');
    }
    const index = sectionExits.sectionFive.findIndex((value) => value._id.toString() === val);
    if (index === -1) {
      throw new NotFoundError('section five not found');
    }
    return true;
  }),
  validatorMiddleWare
];

export const addSectionSixValidator = [
  body('title').isString().withMessage('title required'),
  body('image').custom((val, { req }) => {
    if (!req.file) {
      throw new Error('image required');
    }
    return true;
  }),
  validatorMiddleWare
];

export const deleteFromSectionSixValidator = [
  param('id').custom(async (val, { req }) => {
    const sectionExits = await LandingPage.findOne({});
    if (!sectionExits) {
      throw new NotFoundError('landing page not found');
    }
    const index = sectionExits.sectionSix.findIndex((value) => value._id.toString() === val);
    if (index === -1) {
      throw new NotFoundError('section six not found');
    }
    return true;
  }),
  validatorMiddleWare
];

export const addSectionSevenValidator = [
  body('link').isString().withMessage('links required'),
  validatorMiddleWare
];

export const deleteFromSectionSevenValidator = [
  param('id').custom(async (val, { req }) => {
    const sectionExits = await LandingPage.findOne({});
    if (!sectionExits) {
      throw new NotFoundError('landing page not found');
    }
    const index = sectionExits.sectionSeven.findIndex((value) => value._id.toString() === val);
    if (index === -1) {
      throw new NotFoundError('section not found');
    }
    return true;
  }),
  validatorMiddleWare
];
