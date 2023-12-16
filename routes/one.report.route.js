import { Router } from 'express';
const router = Router();

import protectRoute from '../middleware/authMiddleware.js';
import { allowTo } from '../controller/user.controller.js';

import { 
  addOneTitleValidator,
  updateOneTitleValidator,
  deleteOneTitleValidator,
  addOneTitlePdfValidator
} from '../utils/validators/one.report.validator.js';
import {
  addOneTitle,
  updateOneTitle,
  deleteOneTitle,
  deleteOneTitlePdf,
  addOneTitlePdf
} from '../controller/one.report.controller.js';

router.post(
  '/add/:id',
  protectRoute,
  allowTo('admin'),
  addOneTitleValidator,
  addOneTitle
);

router.patch(
  '/update/pdf',
  protectRoute,
  allowTo('admin'),
  addOneTitlePdfValidator,
  addOneTitlePdf
)

router.patch(
  '/update',
  protectRoute,
  allowTo('admin'),
  updateOneTitleValidator,
  updateOneTitle
);

router.delete(
  '/delete',
  protectRoute,
  allowTo('admin'),
  deleteOneTitleValidator,
  deleteOneTitle
);

router.delete(
  '/delete/pdf',
  protectRoute,
  allowTo('admin'),
  updateOneTitleValidator,
  deleteOneTitlePdf
);

export default router;