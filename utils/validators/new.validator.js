import { body, param, query } from 'express-validator';
import validatorMiddleWare from '../../middleware/validatorMiddleware.js';
import New from '../../models/New.js';
import BadRequest from '../../errors/badRequest.js';  
import NotFound from '../../errors/notFound.js';

export const addNewValidator = [
  body('date').isDate().withMessage('date required'),
  body('title').isString().withMessage('title required'),
  body('image').custom((val, { req }) => {
    if (!req.file) {
      throw new BadRequest('image required');
    }
    return true;
  }),
  body('description').isString().withMessage('description required'),
  body('type').isString().withMessage('type required')
    .custom((val) => {
      if (!["الإنجازات", "أكاديمي", "مشاركات", "فعاليات"].includes(val)) {
        throw new BadRequest('type must be الإنجازات or أكاديمي or مشاركات or فعاليات');
      }
      return true;
    }),
  validatorMiddleWare
];

export const deleteNewValidator = [
  param('id').isMongoId().withMessage('id required')
    .custom(async (val) => {
      const newExits = await New.findById(val);
      if (!newExits) {
        throw new NotFound('new not found');
      }
      return true;
    }),
  validatorMiddleWare
];

export const getAllNewValidator = [
  query('type').isString().withMessage('type required')
    .custom((val) => {
      if (!["الإنجازات", "أكاديمي", "مشاركات", "فعاليات"].includes(val)) {
        throw new BadRequest('type must be الإنجازات or أكاديمي or مشاركات or فعاليات');
      }
      return true;
    }),
  validatorMiddleWare
];
