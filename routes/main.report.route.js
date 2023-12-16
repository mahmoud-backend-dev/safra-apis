import { Router } from 'express';
const router = Router();

import protectRoute from '../middleware/authMiddleware.js';
import { allowTo } from '../controller/user.controller.js';

import {
  addMainTitleValidator,
  getSpecificReportValidator
} from '../utils/validators/main.report.validator.js';

import {
  addMainTitle,
  getSpecificReport,
  deleteMainTitle,
  getAllMainTitles,
  updateMainTitle,
  getAllReport
} from '../controller/main.report.controller.js';

router.post(
  '/add',
  protectRoute,
  allowTo('admin'),
  addMainTitleValidator,
  addMainTitle
);

router.get(
  '/all',
  getAllMainTitles
);

router.get(
  '/all/report',
  getAllReport
);

router.get(
  '/one/report/:id',
  getSpecificReportValidator,
  getSpecificReport
);

router.patch(
  '/update/:id',
  protectRoute,
  allowTo('admin'),
  getSpecificReportValidator,
  updateMainTitle
);

router.delete(
  '/delete/report/:id',
  protectRoute,
  allowTo('admin'),
  getSpecificReportValidator,
  deleteMainTitle
);

export default router;