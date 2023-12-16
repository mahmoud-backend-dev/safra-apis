import { Router } from 'express';
const router = Router();

import protectRoute from '../middleware/authMiddleware.js';
import { allowTo } from '../controller/user.controller.js';
import {
  addProgramValidator, getSpecificValidator,

} from '../utils/validators/program.validator.js';
import {
  addProgram,
  deleteSpecificProgram,
  getAllProgram,
  getSpecificProgram,
  updateSpecificProgram,
} from '../controller/program.controller.js';


router.post('/add', protectRoute, allowTo('admin'), addProgramValidator, addProgram);
router.get('/all', protectRoute, allowTo('admin'), getAllProgram);
router.get('/one/:id', protectRoute, allowTo('admin'), getSpecificValidator, getSpecificProgram);
router.patch('/update/:id', protectRoute, allowTo('admin'), getSpecificValidator, updateSpecificProgram);
router.delete('/delete/:id', protectRoute, allowTo('admin'), getSpecificValidator, deleteSpecificProgram);

export default router;