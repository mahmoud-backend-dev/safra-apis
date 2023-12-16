import { Router } from 'express';
import protectRoutes from '../middleware/authMiddleware.js';
import { allowTo } from '../controller/user.controller.js';
import {
  addComplaintValidator,
  deleteSpecificComplaintValidator,
} from '../utils/validators/complaint.validator.js';
import {
  addComplaint,
  deleteSpecificComplaint,
  getAllComplaints,
  getSpecificComplaint
} from '../controller/complaint.controller.js';

const router = Router();

router.post(
  '/add',
  addComplaintValidator,
  addComplaint
);

router.get(
  '/one/:id',
  protectRoutes,
  allowTo('admin'),
  deleteSpecificComplaintValidator,
  getSpecificComplaint
);

router.get(
  '/all',
  protectRoutes,
  allowTo('admin'),
  getAllComplaints
);

router.delete(
  '/delete/:id',
  protectRoutes,
  allowTo('admin'),
  deleteSpecificComplaintValidator,
  deleteSpecificComplaint
);

export default router;