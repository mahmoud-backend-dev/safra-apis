import { Router } from 'express';
const router = Router();

import protectRoute from '../middleware/authMiddleware.js';
import { allowTo } from '../controller/user.controller.js';

import {
  addStudentValidator,
  getDataValidator,
  getStudentValidator,
  updateStudentValidator,
} from '../utils/validators/student.validator.js';
import {
  addStudent,
  deleteSpecificStudentCourse,
  getAllStudent,
  getSpecificStudent,
  getStudentData,
  updateStudentData
} from '../controller/student.controller.js';
import { uploadSingleFile } from '../middleware/uploadFileMiddleWare.js';





router.post(
  '/add',
  protectRoute,
  allowTo('admin'),
  uploadSingleFile('file', 'certificate', 'pdf'),
  addStudentValidator,
  addStudent
);

router.get('/get/data', getDataValidator, getStudentData);

router.patch(
  '/update',
  protectRoute,
  allowTo('admin'),
  uploadSingleFile('file', 'certificate', 'pdf'),
  updateStudentValidator,
  updateStudentData
);

router.delete(
  '/delete',
  protectRoute,
  allowTo('admin'),
  updateStudentValidator,
  deleteSpecificStudentCourse
);

router.get(
  '/get/one/:id/progId/:progId',
  protectRoute,
  allowTo('admin'),
  getStudentValidator,
  getSpecificStudent
);

router.get(
  '/get/all',
  protectRoute,
  allowTo('admin'),
  getAllStudent
);

export default router;