import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import {
  body,
} from 'express-validator';

export const addDelayStudyValidator = [
  body('name').isString().withMessage('name required'),
  body('email').isEmail().withMessage('email required and must be email'),
  body('ID').isNumeric().withMessage('ID required and must be number'),
  body('educationalPath').isString().withMessage('educationalPath required'),
  body('numAcademic').isNumeric().withMessage('numAcademic required and must be number'),
  body('seamsterYear').isString().withMessage('seamsterYear required'),
  body('academicYear').isNumeric().withMessage('academicYear required and must be number'),
  body('priceOfDelay').isNumeric().withMessage('priceOfDelay required and must be number'),
  body('seamsterPaymentName').isString().withMessage('seamsterPaymentName required'),
  body('nameSeamsterOfDelay').isString().withMessage('nameSeamsterOfDelay required'),
  body('nameAcademicOfDelay').isNumeric().withMessage('nameAcademicOfDelay required and must be number'),
  body('twoYears').isString().withMessage('twoYears required'),
  body('reason').isString().withMessage('reason required'),
  body('phone').isNumeric().withMessage('phone required and must be number'),
  validatorMiddleware,
]