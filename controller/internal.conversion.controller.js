import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import InternalConversion from "../models/InternalConversion.js";
import CustomErrorAPI from "../errors/customErrorAPI.js";
import BadRequest from "../errors/badRequest.js";
import { unlink } from 'fs/promises';
import sendEmail from "../utils/sendEmail.js";


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

export const addInternalConversion = asyncHandler(async (req, res) => {
  if(Object.keys(req.files).length > 0) {
    if(!req.files.imageId) {
      throw new BadRequest('Please upload imageId');
    }
    if(!req.files.paymentReceiptImage) {
      await unlink(req.files.imageId[0].path);
      throw new BadRequest('Please upload paymentReceiptImage');
    }
    req.body.imageId = `${process.env.BASE_URL}/internal-conversion/${req.files.imageId[0].filename}`;
    req.body.paymentReceiptImage = `${process.env.BASE_URL}/internal-conversion/${req.files.paymentReceiptImage[0].filename}`;
  } else
    throw new BadRequest('Please upload images');
  const internalConversion = await InternalConversion.create(req.body);
  const mailOpts = {};
  mailOpts.from = internalConversion.email;
  mailOpts.subject = 'تحويل داخلي';
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
      <h3> الإسم رباعي : ${internalConversion.name}</h3>
      <h3> رقم الهوية : ${internalConversion.ID}</h3>
      <h3> الرقم الأكاديمي : ${internalConversion.academicNumber}</h3>
      <h3> الفصل الدراسي : ${internalConversion.seamsterYear}</h3>
      <h3> العام الدراسي : ${internalConversion.academicYear}</h3>
      <h3> مبلغ سداد الرسوم : ${internalConversion.priceOfInternalConversion}</h3>
      <h3> مبلغ سداد رسوم الفصل الدراسي : ${internalConversion.priceOfSeamsterInternalConversion}</h3>
      <h3> المسار الدراسى : ${internalConversion.educationalPath}</h3>
      <h3> التجويل الي : ${internalConversion.to}</h3>
      <h3> المقر : ${internalConversion.location}</h3>
      <h3> سبب التحويل : ${internalConversion.reason}</h3>
      <h3> البريد الالكتروني : ${internalConversion.email}</h3>
      <h3> رقم الجوال : ${internalConversion.phone}</h3>
      <h3> تاريخ تقديم الطلب : ${internalConversion.createdAt.toLocaleString('en-US', options)}</h3>
    </div>
    <div class="arabic">
        '<h3>الصور المرفقة </h3>'
        '<h2>------------------------------------------------------------------------</h2>'
        '<h3> صورة الهوية : ${internalConversion.imageId} </h3>'
        '<h3> إيصال سداد الرسوم : ${internalConversion.paymentReceiptImage} </h3>'
      </div>
  </body>
</html>`;

  try {
    await sendEmail(mailOpts);
  } catch (error) {
    internalConversion.deleteOne();
    await unlink(req.files.imageId[0].path);
    await unlink(req.files.paymentReceiptImage[0].path);
    throw new CustomErrorAPI('Email could not be sent', StatusCodes.INTERNAL_SERVER_ERROR);
  }
  res.status(StatusCodes.CREATED).json({
    success: "success",
    data: internalConversion
  })
})