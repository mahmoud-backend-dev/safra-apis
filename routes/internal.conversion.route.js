import { Router } from 'express';
const router = Router();
import {
  uploadMixedOfFiles,
} from '../middleware/uploadFileMiddleWare.js';
import {
  addInternalConversionValidator
} from '../utils/validators/internal.conversion.validator.js';
import {
  addInternalConversion
} from '../controller/internal.conversion.controller.js';


router.post(
  '/send',
  uploadMixedOfFiles(
    [
      { name: "imageId", maxCount: 1 },
      { name: "paymentReceiptImage", maxCount: 1 },
    ],
    'internal-conversion',
    'imgAndPdf'
  ),
  addInternalConversionValidator,
  addInternalConversion
);

export default router;