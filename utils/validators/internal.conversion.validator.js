import { body } from 'express-validator';
import validatorMiddleWare from '../../middleware/validatorMiddleware.js';

export const addInternalConversionValidator = [
  body('name').isString().withMessage('name required'),
  body('email').isEmail().withMessage('email required and must be email'),
  body('ID').isNumeric().withMessage('ID required and must be number'),
  body('academicNumber').isNumeric().withMessage('academicNumber required and must be number'),
  body('seamsterYear').isString().withMessage('seamsterYear required'),
  body('academicYear').isNumeric().withMessage('academicYear required and must be number'),
  body('priceOfInternalConversion').isNumeric().withMessage('priceOfInternalConversion required and must be number'),
  body('priceOfSeamsterInternalConversion').isString().withMessage('priceOfSeamsterInternalConversion required'),
  body('educationalPath').isString().withMessage('educationalPath required'),
  body('to').isString().withMessage('to required'),
  body('location').isString().withMessage('location required'),
  body('reason').isString().withMessage('reason required'),
  body('phone').isNumeric().withMessage('phone required and must be number'),
  validatorMiddleWare
]