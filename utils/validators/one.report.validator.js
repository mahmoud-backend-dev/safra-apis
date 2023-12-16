import { body, param, query } from 'express-validator';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import Report from '../../models/Report.js';
import NotFoundError from '../../errors/notFound.js';

export const addOneTitleValidator = [
  body('subTitle').isString().withMessage('subTitle required'),
  body('arrOfPDFs').isArray().withMessage('arrOfPDFs required'),
  body('arrOfPDFs.*.name').isString().withMessage('name required'),
  body('arrOfPDFs.*.link').isString().withMessage('link required'),
  param('id').isMongoId().withMessage('id required')
    .custom(async (val) => {
      const report = await Report.findById(val);
      if (!report) {
        throw new NotFoundError(`No report for this id: ${val}`);
      }
      return true;
    }),
  validatorMiddleware
];

export const addOneTitlePdfValidator = [
  body('name').isString().withMessage('name required'),
  body('link').isString().withMessage('link required'),
  query('id').isMongoId().withMessage('id required')
    .custom(async (val) => {
      const report = await Report.findById(val);
      if (!report) {
        throw new NotFoundError(`No report for this id: ${val}`);
      }
      return true;
    }),
  query('oneTitleId').isMongoId().withMessage('oneTitleId required')
    .custom(async (val, { req }) => { 
      const report = await Report.findOne({ _id: req.query.id, 'oneTitle._id': val });
      if (!report) {
        throw new NotFoundError(`No oneTitle for this id: ${val}`);
      }
      return true;
    }),
  validatorMiddleware
]

export const updateOneTitleValidator = [
  query('id').isMongoId().withMessage('id required')
    .custom(async (val) => {
      const report = await Report.findById(val);
      if (!report) {
        throw new NotFoundError(`No report for this id: ${val}`);
      }
      return true;
    }),
  query('oneTitleId').isMongoId().withMessage('noTitleId required')
    .custom(async (val, { req }) => {
      const report = await Report.findOne({ _id: req.query.id, 'oneTitle._id': val });
      if (!report) {
        throw new NotFoundError(`No oneTitleId for this id: ${val}`);
      }
      return true;
    }),
  query('idPdf').isMongoId().withMessage('idPdf required')
    .custom(async (val, { req }) => {
      const report = await Report.findOne({ _id: req.query.id, 'oneTitle._id': req.query.oneTitleId });
      const oneTitle = report.oneTitle.filter((el) => el._id == req.query.oneTitleId);
      const pdf = oneTitle[0].arrOfPDFs.filter((el) => el._id == val);
      if (pdf.length === 0) {
        throw new NotFoundError(`No pdf for this id: ${val}`);
      }
      return true;
    }),
  validatorMiddleware,
];

export const deleteOneTitleValidator = [
  query('id').isMongoId().withMessage('id required')
    .custom(async (val) => {
      const report = await Report.findById(val);
      if (!report) {
        throw new NotFoundError(`No report for this id: ${val}`);
      }
      return true;
    }),
  query('oneTitleId').isMongoId().withMessage('oneTitleId required')
    .custom(async (val, { req }) => {
      const report = await Report.findOne({ _id: req.query.id, 'oneTitle._id': val });
      if (!report) {
        throw new NotFoundError(`No oneTitle for this id: ${val}`);
      }
      return true;
    }),
  validatorMiddleware,
]