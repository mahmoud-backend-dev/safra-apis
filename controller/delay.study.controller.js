import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import DelayStudy from "../models/DelayStudy.js";
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

export const addDelayStudy = asyncHandler(async (req, res) => {
  if (Object.keys(req.files).length > 0) {
    if (!req.files.imageId) {
      throw new BadRequest('Please upload imageId');
    }
    if (!req.files.proveImage) {
      await unlink(req.files.imageId[0].path);
      throw new BadRequest('Please upload proveImage');
    }
    if (!req.files.paymentReceiptImage) {
      await unlink(req.files.imageId[0].path);
      await unlink(req.files.proveImage[0].path);
      throw new BadRequest('Please upload paymentReceiptImage');
    }
    req.body.imageId = `${process.env.BASE_URL}/delay-study/${req.files.imageId[0].filename}`;
    req.body.proveImage = `${process.env.BASE_URL}/delay-study/${req.files.proveImage[0].filename}`;
    req.body.paymentReceiptImage = `${process.env.BASE_URL}/delay-study/${req.files.paymentReceiptImage[0].filename}`;
  } else
    throw new BadRequest('Please upload images');
  const delayStudy = await DelayStudy.create(req.body);
  const mailOpts = {};
  mailOpts.from = delayStudy.email;
  mailOpts.subject = 'تأجيل الدراسة';
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
      <h3> الاسم : ${delayStudy.name}</h3>
      <h3> رقم الهوية : ${delayStudy.ID}</h3>
      <h3> المسار الدراسي : ${delayStudy.educationalPath}</h3>
      <h3> الرقم الاكاديمي : ${delayStudy.numAcademic}</h3>
      <h3> الفصل الدراسي : ${delayStudy.seamsterYear}</h3>
      <h3> العام الدراسي : ${delayStudy.academicYear}</h3>
      <h3> مبلغ سداد الرسوم : ${delayStudy.priceOfDelay}</h3>
      <h3> أرغب فى تأجيل الفصل الدراسي : ${delayStudy.nameSeamsterOfDelay} </h3>
      <h3> أرغب فى تأجيل العام الدراسي : ${delayStudy.nameAcademicOfDelay}</h3>
      <h3> للعامين الدراسيين : ${delayStudy.twoYears}</h3>
      <h3> سبب التأجيل : ${delayStudy.reason}</h3>
      <h3> مبلغ سداد رسوم الفصل الدراسي : ${delayStudy.seamsterPaymentName}</h3>
      <h3> البريد الالكتروني : ${delayStudy.email}</h3>
      <h3> رقم الجوال : ${delayStudy.phone}</h3>
      <h3> تاريخ تقديم الطلب : ${delayStudy.createdAt.toLocaleString('en-US', options)}</h3>
    </div>
    <div class="arabic">
        '<h3>الصور المرفقة </h3>'
        '<h2>------------------------------------------------------------------------</h2>'
        '<h3> صورة الهوية : ${delayStudy.imageId} </h3>'
        '<h3> ما يثبت ظروف الطالبة : ${delayStudy.proveImage} </h3>'
        '<h3> إيصال سداد الرسوم : ${delayStudy.paymentReceiptImage} </h3>'
      </div>
  </body>
</html>
`;
  try {
    await SendEmail(mailOpts);
  } catch (error) {
    delayStudy.deleteOne();
    await unlink(req.files.imageId[0].path);
    await unlink(req.files.proveImage[0].path);
    await unlink(req.files.paymentReceiptImage[0].path);
    throw new CustomErrorAPI('There is an error in sending email', StatusCodes.INTERNAL_SERVER_ERROR);
  };

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: {
      delayStudy
    }
  });
});