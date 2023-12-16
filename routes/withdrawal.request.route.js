import { Router } from 'express';
import {
  addWithdrawalRequestValidator
} from '../utils/validators/withdrawal.request.validator.js';
import { uploadMixedOfFiles } from '../middleware/uploadFileMiddleWare.js';
import {
  addWithdrawalRequest
} from '../controller/withdrawal.request.controller.js';


const router = Router();

router.post(
  '/send',
  uploadMixedOfFiles(
    [
      { name: "imageId", maxCount: 1 },
      { name: "proveImage", maxCount: 1 },
      { name: "paymentReceiptImage", maxCount: 1 },
      {name:'bankIdImage',maxCount:1},
    ],
    'withdrawal-request',
    'imgAndPdf'
  ),
  addWithdrawalRequestValidator,
  addWithdrawalRequest
)

export default router;