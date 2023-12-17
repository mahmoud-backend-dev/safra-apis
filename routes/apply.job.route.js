import { Router } from 'express';
import protectRoutes from '../middleware/authMiddleware.js';
import { allowTo } from '../controller/user.controller.js';
import { uploadMixedOfFiles } from '../middleware/uploadFileMiddleWare.js';
import {
  addApplyJobValidator,
  deleteSpecificApplyJobValidator
} from '../utils/validators/apply.job.validator.js';
import {
  addApplyJob,
  deleteSpecificApplyJob,
  getAllApplyJobsByJobId,
  getSpecificApplyJob
} from '../controller/apply.job.controller.js';
const router = Router();

router.post(
  '/add',
  uploadMixedOfFiles(
    [
      { name: "imgAcademicQualification", maxCount: 1 },
      { name: "imgResume", maxCount: 1 },
      { name: "imgIdBank", maxCount: 1 },
    ],
    'apply-job',
    'image'
  ),
  addApplyJobValidator,
  addApplyJob
);

router.get(
  '/one/:id',
  protectRoutes,
  allowTo('admin'),
  deleteSpecificApplyJobValidator,
  getSpecificApplyJob
);

router.get(
  '/all/:id',
  protectRoutes,
  allowTo('admin'),
  getAllApplyJobsByJobId
);

router.delete(
  '/delete/:id',
  protectRoutes,
  allowTo('admin'),
  deleteSpecificApplyJobValidator,
  deleteSpecificApplyJob
)

export default router;