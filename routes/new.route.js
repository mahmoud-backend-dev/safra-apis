import { Router } from 'express';
const router = Router();
import protectRoutes from '../middleware/authMiddleware.js';
import { allowTo } from '../controller/user.controller.js';
import { uploadSingleFile } from '../middleware/uploadFileMiddleWare.js';
import {
  addNewValidator,
  deleteNewValidator,
  getAllNewValidator
} from '../utils/validators/new.validator.js';
import {
  addNew,
  deleteNew,
  getAllNew,
  getAllNewsWithoutType,
  getSpecificNew,
  updateNew
} from '../controller/new.controller.js';


router.post(
    '/add',
    protectRoutes,
    allowTo('admin'),
    uploadSingleFile('image', 'landing-page/news', 'image'),
    addNewValidator,
    addNew
);
router.get(
  '/all',
  getAllNewValidator,
  getAllNew
);
router.patch(
  '/update/:id',
  protectRoutes,
  allowTo('admin'),
  uploadSingleFile('image', 'landing-page/news', 'image'),
  deleteNewValidator,
  updateNew
)
router.delete(
  '/delete/:id',
  protectRoutes,
  allowTo('admin'),
  deleteNewValidator,
  deleteNew
);
router.get(
    '/:id',
    deleteNewValidator,
    getSpecificNew
);
router.get(
  '/all/without-type',
  protectRoutes,
  allowTo('admin'),
  getAllNewsWithoutType
);


export default router;