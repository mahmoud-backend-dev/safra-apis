import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import {
  body,
  param,
} from 'express-validator';
import NotFound from '../../errors/notFound.js';
import BadRequest from '../../errors/badRequest.js';
import Complaint from '../../models/Complaint.js';

export const addComplaintValidator = [
  body('class').isString().withMessage('class required')
    .custom((value) => {
      const arrOfClass = ['طالب', 'أستاذ', 'إدارى', 'غير ذلك'];
      if (!arrOfClass.includes(value)) {
        throw new BadRequest('class must be one of طالب, أستاذ, إدارى, غير ذلك');
      }
      return true;
    }),
  body('location').isString().withMessage('location required'),
  body('complaint').isString().withMessage('complaint required'),
  validatorMiddleware,
];

export const deleteSpecificComplaintValidator = [
  param('id').isMongoId().withMessage('id required and must be mongoId')
    .custom(async (id) => {
      const complaint = await Complaint.findById(id);
      if (!complaint) {
        throw new NotFound('complaint not found');
      }
      return true;
    }),
  validatorMiddleware,
]