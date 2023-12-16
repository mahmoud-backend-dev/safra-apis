import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import {
  body,
  query,
  param
} from 'express-validator';
import Student from '../../models/Student.js';
import BadRequest from '../../errors/badRequest.js';
import NotFoundError from '../../errors/notFound.js';
import Program from '../../models/Program.js';

export const addStudentValidator = [
  body('ID').notEmpty().isNumeric().withMessage('ID required and must be numeric value'),
  body("name").notEmpty().withMessage('name required'),
  body('programId').isNumeric().withMessage('programId required and must be numeric value')
    .custom(async (val) => {
      const program = await Program.findOne({ ID: val });
      if (!program)
        throw new NotFoundError(`No program for this id: ${val}`)
      return true
    }),
  body('degree').isNumeric().withMessage('degree required and must be numeric value'),
  body('evaluation').isString().withMessage('evaluation required and must be numeric value')
    .custom((val) => {
      const arrOfEvaluations = [
        'ممتاز مرتفع',
        'ممتاز',
        'جيد جداً مرتفع',
        'جيد جداً',
        'جيد مرتفع',
        'جيد',
        'مقبول مرتفع',
        'مقبول',
        'راسب'
      ];
      if (!arrOfEvaluations.includes(val))
        throw new BadRequest(`evaluation must be ممتاز مرتفع, ممتاز, جيد جداً مرتفع, جيد جداً, جيد مرتفع, جيد, مقبول مرتفع, مقبول, راسب`)
      return true
    }),
  validatorMiddleware
];

export const getDataValidator = [
  query('ID')
    .custom(async (val) => {
      const student = await Student.findOne({ ID: val });
      if (!student)
        throw new NotFoundError(`No found student for this ID: ${val}`)
      return true
    }),
  validatorMiddleware,
];

export const updateStudentValidator = [
  query('ID')
    .custom(async (val) => {
      const student = await Student.findOne({ ID: val });
      if (!student)
        throw new NotFoundError(`No found student for this ID: ${val}`)
      return true
    }),
  query('programId')
    .custom(async (val, { req }) => {
      const programs = await Student.findOne({ ID: req.query.ID }).select('programs');
      if(!programs)
        throw new NotFoundError(`No found student for this ID: ${req.query.ID}`)
      const program = programs.programs.find((item) => item.programId === Number(val));
      if (!program)
        throw new NotFoundError(`No found student program for this programId: ${val}`)
      return true
    }),
  validatorMiddleware,
];

export const getStudentValidator = [
  param('id')
    .custom(async (val) => {
      const student = await Student.findById(val);
      if (!student)
        throw new NotFoundError(`No found student for this ID: ${val}`)
      return true
    }),
  param('progId')
    .custom(async (val, { req }) => {
      const student = await Student.findById(req.params.id);
      if (!student)
        throw new NotFoundError(`No found student for this ID: ${req.params.id}`)
      const program = student.programs.find((item) => item.id == val);
      if (!program)
        throw new NotFoundError(`No found program for this student: ${val}`)
      return true
    }),
  validatorMiddleware,
];

