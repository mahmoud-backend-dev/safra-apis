import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import {
  body,
} from 'express-validator';


export const addWithdrawalRequestValidator = [
  body('name').isString().withMessage('name required'),
  body('email').isEmail().withMessage('email required and must be email'),
  body('ID').isNumeric().withMessage('ID required and must be number'),
  body('educationalPath').isString().withMessage('educationalPath required'),
  body('numAcademic').isNumeric().withMessage('numAcademic required and must be number'),
  body('seamsterYear').isString().withMessage('seamsterYear required'),
  body('academicYear').isNumeric().withMessage('academicYear required and must be number'),
  body('priceOfWithdrawalRequest').isNumeric().withMessage('priceOfWithdrawalRequest required and must be number'),
  body('seamsterPaymentName').isString().withMessage('seamsterPaymentName required'),
  body('nameSeamsterOfWithdrawal').isString().withMessage('nameSeamsterOfWithdrawal required'),
  body('nameAcademicOfWithdrawal').isNumeric().withMessage('nameAcademicOfWithdrawal required and must be number'),
  body('phone').isNumeric().withMessage('phone required and must be number'),
  body('reason').isString().withMessage('reason required'),
  validatorMiddleware,
]