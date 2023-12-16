import { Router } from 'express';
import protectRoutes from '../middleware/authMiddleware.js';
import { allowTo } from '../controller/user.controller.js';
import { uploadSingleFile } from '../middleware/uploadFileMiddleWare.js';
import {
  addJobValidator,
  deleteSpecificJobValidator
} from '../utils/validators/job.validator.js';
import {
  addJob,
  deleteSpecificJob,
  getAllJobs,
  getSpecificJob,
  updateJob
} from '../controller/job.controller.js';

const router = Router();

router.post(
  '/add',
  protectRoutes,
  allowTo('admin'),
  uploadSingleFile('image', 'jobs', 'image'),
  addJobValidator,
  addJob
);

router.patch(
  '/update/:id',
  protectRoutes,
  allowTo('admin'),
  uploadSingleFile('image', 'jobs', 'image'),
  updateJob
);

router.get(
  '/one/:id',
  protectRoutes,
  allowTo('admin'),
  deleteSpecificJobValidator,
  getSpecificJob
);

router.get(
  '/all',
  protectRoutes,
  allowTo('admin'),
  getAllJobs
);

router.delete(
  '/delete/:id',
  protectRoutes,
  allowTo('admin'),
  deleteSpecificJobValidator,
  deleteSpecificJob
);

export default router;