import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import ExternalConversion from "../models/ExternalConversion.js";
import CustomErrorAPI from "../errors/customErrorAPI.js";
import SendEmail from "../utils/sendEmail.js";
import BadRequest from "../errors/badRequest.js";
import { unlink } from 'fs/promises';

// Options for formatting
const options = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

export const addExternalConversion = asyncHandler(async (req, res) => {
  if (Object.keys(req.files).length > 0) {
    if (!req.files.imageId)
      throw new BadRequest('Please upload imageId');
    if (!req.files.previousCertificateImage) {
      await unlink(req.files.imageId[0].path);
      throw new BadRequest('Please upload previousCertificateImage');
    }
    if (!req.files.academicIdImage) {
      await unlink(req.files.imageId[0].path);
      await unlink(req.files.previousCertificateImage[0].path);
      throw new BadRequest('Please upload academicIdImage');
    }
    if (!req.files.paymentReceiptImage) {
      await unlink(req.files.imageId[0].path);
      await unlink(req.files.previousCertificateImage[0].path);
      await unlink(req.files.academicIdImage[0].path);
      throw new BadRequest('Please upload paymentReceiptImage');
    }

    req.body.imageId = `${process.env.BASE_URL}/external-conversion/${req.files.imageId[0].filename}`;
    req.body.previousCertificateImage = `${process.env.BASE_URL}/external-conversion/${req.files.previousCertificateImage[0].filename}`;
    req.body.academicIdImage = `${process.env.BASE_URL}/external-conversion/${req.files.academicIdImage[0].filename}`;
    req.body.paymentReceiptImage = `${process.env.BASE_URL}/external-conversion/${req.files.paymentReceiptImage[0].filename}`;

  } else
    throw new BadRequest('Please upload images');
  const externalConversion = await ExternalConversion.create(req.body);
  const mailOpts = {};
  mailOpts.from = externalConversion.email;
  mailOpts.subject = 'تحويل خارجي';
  mailOpts.html = `
<html>
  <head>
    <style>
      /* Define text direction and alignment for Arabic text */
      .arabic {
        direction: rtl;
        text-align: right;
      }
    </style>
  </head>
  <body>
    <div class="arabic">
      <h3> الاسم : ${externalConversion.name}</h3>
      <h3> الجنسية : ${externalConversion.nationality}</h3>
      <h3> رقم الهوية : ${externalConversion.ID}</h3>
      <h3> الجمعية التى كنت تدرس فيها : ${externalConversion.association}</h3>
      <h3> الفصل الدراسي : ${externalConversion.seamsterYear}</h3>
      <h3> العام الدراسي : ${externalConversion.academicYear}</h3>
      <h3> المسار الدراسى : ${externalConversion.from}</h3>
      <h3> التجويل الي : ${externalConversion.to}</h3>
      <h3> المقر : ${externalConversion.location}</h3>
      <h3> سبب التحويل : ${externalConversion.reason}</h3>
      <h3> البريد الالكتروني : ${externalConversion.email}</h3>
      <h3> رقم الجوال : ${externalConversion.phone}</h3>
      <h3> تاريخ تقديم الطلب : ${externalConversion.createdAt.toLocaleString('en-US',options)}</h3>
    </div>
    <div class="arabic">
        '<h3>الصور المرفقة </h3>'
        '<h2>------------------------------------------------------------------------</h2>'
        '<h3> صورة الهوية : ${externalConversion.imageId} </h3>'
        '<h3> الشهادة السابقة : ${externalConversion.previousCertificateImage} </h3>'
        '<h3> السجل الأكاديمي : ${externalConversion.academicIdImage} </h3>'
        '<h3> إيصال سداد الرسوم : ${externalConversion.paymentReceiptImage} </h3>'
      </div>
  </body>
</html>
`;
  try {
    await SendEmail(mailOpts);
  } catch (error) {
    externalConversion.deleteOne();
    await unlink(req.files.imageId[0].path);
    await unlink(req.files.previousCertificateImage[0].path);
    await unlink(req.files.academicIdImage[0].path);
    await unlink(req.files.paymentReceiptImage[0].path);
    throw new CustomErrorAPI('There is an error in sending email', StatusCodes.INTERNAL_SERVER_ERROR);
  };

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: {
      externalConversion
    }
  });
});