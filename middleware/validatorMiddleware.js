import { unlink } from 'fs/promises';
import { validationResult } from 'express-validator';

// Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleWare = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file) {
            await unlink(req.file.path);
        };
        if (req.files) {
            if (req.files.imageId)
                await unlink(req.files.imageId[0].path);
            if (req.files.previousCertificateImage)
                await unlink(req.files.previousCertificateImage[0].path);
            if (req.files.academicIdImage)
                await unlink(req.files.academicIdImage[0].path);
            if (req.files.paymentReceiptImage)
                await unlink(req.files.paymentReceiptImage[0].path);
            if (req.files.proveImage)
                await unlink(req.files.proveImage[0].path);
            if (req.files.bankIdImage)
                await unlink(req.files.bankIdImage[0].path);
        }
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default validatorMiddleWare;