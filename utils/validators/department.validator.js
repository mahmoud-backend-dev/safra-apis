import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import {
  body,
  param
} from 'express-validator';
import Department from '../../models/Department.js';
import NotFoundError from '../../errors/notFound.js';
import BadRequest from '../../errors/badRequest.js';

export const addDepartmentValidator = [
  body('name').notEmpty().withMessage('name required')
    .custom(async (val) => {
      const department = await Department.findOne({ name: val })
      if (department)
        throw new BadRequest('name must be unique value')
      return true
    }),
  validatorMiddleware
];

export const getSpecificValidator = [
  param('id')
    .custom(async (val) => {
      const department = await Department.findById(val)
      if (!department)
        throw new NotFoundError(`No department for this id: ${val}`);
      return true
    }),
  validatorMiddleware
];