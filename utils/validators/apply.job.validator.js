import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import {
  body,
  param,
} from 'express-validator';
import NotFound from '../../errors/notFound.js';
import Job from '../../models/Job.js';
import ApplyJob from '../../models/ApplyJob.js';

export const addApplyJobValidator = [
  body('job').isMongoId().withMessage('job required and must be mongoId')
    .custom(async (id) => {
      const job = await Job.findById(id);
      if (!job) {
        throw new NotFound('job not found');
      }
      return true;
    }),
  body('name').isString().withMessage('name required'),
  body('nationality').isString().withMessage('nationality required'),
  body('ID').isString().withMessage('ID required'),
  body('phone').isString().withMessage('phone required'),
  body('email').isString().withMessage('email required'),
  body('academicQualification').isString().withMessage('academicQualification required'),
  body('trainingCourse').isString().withMessage('trainingCourse required'),
  body('skills').isString().withMessage('skills required'),
  body('experience').isString().withMessage('experience required'),
  validatorMiddleware,
];

export const deleteSpecificApplyJobValidator = [
  param('id').isMongoId().withMessage('id required and must be mongoId')
    .custom(async (id) => {
      const applyJob = await ApplyJob.findById(id);
      if (!applyJob) {
        throw new NotFound('applyJob not found');
      }
      return true;
    }),
  validatorMiddleware,
]