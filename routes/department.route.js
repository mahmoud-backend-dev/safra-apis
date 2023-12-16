import { Router } from 'express';
const router = Router();

import protectRoute from '../middleware/authMiddleware.js';
import { allowTo } from '../controller/user.controller.js';

import {
  addDepartmentValidator,
  getSpecificValidator
} from '../utils/validators/department.validator.js';
import {
  addDepartment,
  deleteSpecificDepartment,
  getAllDepartment,
  getSpecificDepartMent,
  updateSpecificDepartment
} from '../controller/department.controller.js';



router.post('/add', protectRoute, allowTo('admin'), addDepartmentValidator, addDepartment);
router.get('/all', protectRoute, allowTo('admin'), getAllDepartment);
router.get('/one/:id', protectRoute, allowTo('admin'), getSpecificValidator, getSpecificDepartMent);
router.patch('/update/:id', protectRoute, allowTo('admin'), getSpecificValidator, updateSpecificDepartment);
router.delete('/delete/:id', protectRoute, allowTo('admin'), getSpecificValidator, deleteSpecificDepartment);

export default router;