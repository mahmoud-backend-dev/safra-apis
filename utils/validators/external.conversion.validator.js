import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import {
  body,
} from 'express-validator';


export const addExternalConversionValidator = [
  body('name').isString().withMessage('name required'),
  body('email').isEmail().withMessage('email required'),
  body('nationality').isString().withMessage('nationality required'),
  body('ID').isNumeric().withMessage('ID required and must be number'),
  body('association').isString().withMessage('association required'),
  body('seamsterYear').isString().withMessage('seamsterYear required'),
  body('academicYear').isNumeric().withMessage('academicYear required and must be number'),
  body('from').isString().withMessage('from required'),
  body('to').isString().withMessage('to required'),
  body('reason').isString().withMessage('reason required'),
  body('phone').isNumeric().withMessage('phone required and must be number'),
  body('location').isString().withMessage('location required'),
  validatorMiddleware,
]