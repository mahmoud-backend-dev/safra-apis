import { body, param, query } from 'express-validator';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import Report from '../../models/Report.js';
import NotFoundError from '../../errors/notFound.js';

export const addNoTitleValidator = [
  body('name').isString().withMessage('name required'),
  body('link').isString().withMessage('link required'),
  param('id').isMongoId().withMessage('id required')
    .custom(async (val) => {
      const report = await Report.findById(val);
      if (!report) {
        throw new NotFoundError(`No report for this id: ${val}`);
      }
      return true;
    }),
  validatorMiddleware
];

export const updateNoTitleValidator = [
  query('id').isMongoId().withMessage('id required')
    .custom(async (val) => {
      const report = await Report.findById(val);
      if (!report) {
        throw new NotFoundError(`No report for this id: ${val}`);
      }
      return true;
    }),
  query('noTitleId').isMongoId().withMessage('noTitleId required')
    .custom(async (val, { req }) => {
      const report = await Report.findOne({ _id: req.query.id, 'noTitle._id': val });
      if (!report) {
        throw new NotFoundError(`No noTitle for this id: ${val}`);
      }
      return true;
    }),
  validatorMiddleware,
];