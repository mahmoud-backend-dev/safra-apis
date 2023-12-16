import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import {
  body,
  param
} from 'express-validator';
import Program from '../../models/Program.js';
import NotFoundError from '../../errors/notFound.js';
import BadRequest from '../../errors/badRequest.js';
import Department from '../../models/Department.js';

export const addProgramValidator = [
  body('ID').notEmpty().withMessage('ID required')
    .isNumeric().withMessage('ID must be numeric value')
    .custom(async (val) => {
      const program = await Program.findOne({ ID: val })
      if (program)
        throw new BadRequest('ID must be unique value')
      return true
    }),
  body('name').notEmpty().withMessage('name required'),
  body('department').isMongoId().withMessage('department required and must be mongoID')
    .custom(async (val) => {
      const department = await Department.findById(val)
      if (!department)
        throw new NotFoundError(`No department for this id: ${val}`)
      return true
    }),
  validatorMiddleware
];

export const getSpecificValidator = [
  param('id')
    .custom(async (val) => {
      const program = await Program.findById(val)
      if (!program)
        throw new NotFoundError(`No program for this id: ${val}`);
      return true
    }),
  validatorMiddleware
];