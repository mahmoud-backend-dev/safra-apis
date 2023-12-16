import { body, param } from 'express-validator';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import NotFoundError from '../../errors/notFound.js';
import Report from '../../models/Report.js';

export const addMainTitleValidator = [
  body('mainTitle').isString().withMessage('mainTitle required'),
  body('category').isString().withMessage('category required')
    .custom((val) => {
      if (!['G', 'R'].includes(val)) {
        throw new Error('category must be G or R');
      }
      return true;
    }),
  validatorMiddleware
];

export const getSpecificReportValidator = [
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
