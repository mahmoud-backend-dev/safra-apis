import { Router } from 'express';
import {
  addExternalConversionValidator
} from '../utils/validators/external.conversion.validator.js';
import {
  addExternalConversion
} from '../controller/external.conversion.controller.js';
import {uploadMixedOfFiles } from '../middleware/uploadFileMiddleWare.js';

const router = Router();

router.post(
  '/send',
  uploadMixedOfFiles(
    [
      { name: "imageId", maxCount: 1 },
      { name: "previousCertificateImage", maxCount: 1 },
      { name: "academicIdImage", maxCount: 1 },
      { name: "paymentReceiptImage", maxCount: 1 }
    ],
    'external-conversion',
    'imgAndPdf'
  ),
  addExternalConversionValidator,
  addExternalConversion
)

export default router;