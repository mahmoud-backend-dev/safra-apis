import { Router } from 'express';
const router = Router();

import protectRoute from '../middleware/authMiddleware.js';
import { allowTo } from '../controller/user.controller.js';

import {
  addNoTitleValidator,
  updateNoTitleValidator
} from '../utils/validators/no.report.validator.js';

import {
  addNoTitle,
  deleteNoTitle,
  updateNoTitle
} from '../controller/no.report.controller.js';

router.post(
  '/add/:id',
  protectRoute,
  allowTo('admin'),
  addNoTitleValidator,
  addNoTitle
);

router.patch(
  '/update',
  protectRoute,
  allowTo('admin'),
  updateNoTitleValidator,
  updateNoTitle
);

router.delete(
  '/delete',
  protectRoute,
  allowTo('admin'),
  updateNoTitleValidator,
  deleteNoTitle
);

export default router;