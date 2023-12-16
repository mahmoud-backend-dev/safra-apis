import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import {
  body
} from 'express-validator';

export const loginValidator = [
  body('email').notEmpty().isEmail().withMessage('email required or incorrect format email'),
  body('password').notEmpty().withMessage('password required')
    .isLength({ min: 6 }).withMessage('Too Short Password'),
  validatorMiddleware
];