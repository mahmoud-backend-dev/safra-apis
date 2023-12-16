import { Router } from 'express';
import {
  uploadMixedOfFiles,
} from '../middleware/uploadFileMiddleWare.js';
import {
  addDelayStudyValidator
} from '../utils/validators/delay.study.validator.js';
import {
  addDelayStudy
} from '../controller/delay.study.controller.js';

const router = Router();

router.post(
  '/send',
  uploadMixedOfFiles(
    [
      { name: "imageId", maxCount: 1 },
      { name: "proveImage", maxCount: 1 },
      { name: "paymentReceiptImage", maxCount: 1 },
    ],
    'delay-study',
    'imgAndPdf'
  ),
  addDelayStudyValidator,
  addDelayStudy
)

export default router;