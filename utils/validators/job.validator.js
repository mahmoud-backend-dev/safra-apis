import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import {
  body,
  param,
} from 'express-validator';
import NotFound from '../../errors/notFound.js';
import BadRequest from '../../errors/badRequest.js';
import Job from '../../models/Job.js';

export const addJobValidator = [
  body('name').isString().withMessage('name required'),
  body('image')
    .custom(async (value, { req }) => {
      if (!req.file) {
        throw new BadRequest('image required');
      }
      return true;
    }),
  validatorMiddleware,
];

export const deleteSpecificJobValidator = [
  param('id').isMongoId().withMessage('id required and must be mongoId')
    .custom(async (id) => {
      const job = await Job.findById(id);
      if (!job) {
        throw new NotFound('job not found');
      }
      return true;
    }),
  validatorMiddleware,
]