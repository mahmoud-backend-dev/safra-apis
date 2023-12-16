import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import WithdrawalRequest from "../models/WithdrawalRequest.js";
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

export const addWithdrawalRequest = asyncHandler(async (req, res) => {

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
    if (!req.files.bankIdImage) {
      await unlink(req.files.imageId[0].path);
      await unlink(req.files.proveImage[0].path);
      await unlink(req.files.paymentReceiptImage[0].path);
      throw new BadRequest('Please upload bankIdImage');
    }
    req.body.imageId = `${process.env.BASE_URL}/withdrawal-request/${req.files.imageId[0].filename}`;
    req.body.proveImage = `${process.env.BASE_URL}/withdrawal-request/${req.files.proveImage[0].filename}`;
    req.body.paymentReceiptImage = `${process.env.BASE_URL}/withdrawal-request/${req.files.paymentReceiptImage[0].filename}`;
    req.body.bankIdImage = `${process.env.BASE_URL}/withdrawal-request/${req.files.bankIdImage[0].filename}`;
  } else
    throw new BadRequest('Please upload images');

  const withdrawalRequest = await WithdrawalRequest.create(req.body);
  const mailOpts = {};
  mailOpts.from = withdrawalRequest.email;
  mailOpts.subject = 'طلب الانسحاب';
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
      <h3> الاسم : ${withdrawalRequest.name}</h3>
      <h3> رقم الهوية : ${withdrawalRequest.ID}</h3>
      <h3> المسار الدراسي : ${withdrawalRequest.educationalPath}</h3>
      <h3> الرقم الاكاديمي : ${withdrawalRequest.numAcademic}</h3>
      <h3> الفصل الدراسي : ${withdrawalRequest.seamsterYear}</h3>
      <h3> العام الدراسي : ${withdrawalRequest.academicYear}</h3>
      <h3> مبلغ سداد الرسوم: ${withdrawalRequest.priceOfWithdrawalRequest}</h3>
      <h3> مبلغ سداد رسوم الفصل الدراسي : ${withdrawalRequest.seamsterPaymentName}</h3>
      <h3> أرغب في الانسحاب من الفصل الدراسى : ${withdrawalRequest.nameSeamsterOfWithdrawal}</h3>
      <h3> أرغب في الانسحاب من العام الدراسى : ${withdrawalRequest.nameAcademicOfWithdrawal}</h3>
      <h3> سبب الإنسحاب : ${withdrawalRequest.reason}</h3>
      <h3> البريد الالكتروني : ${withdrawalRequest.email}</h3>
      <h3> رقم الجوال : ${withdrawalRequest.phone}</h3>
      <h3> تاريخ تقديم الطلب : ${withdrawalRequest.createdAt.toLocaleString('en-US', options)}</h3>
    </div>
    <div class="arabic">
        '<h3>الصور المرفقة </h3>'
        '<h2>------------------------------------------------------------------------</h2>'
        '<h3> صورة الهوية : ${withdrawalRequest.imageId} </h3>'
        '<h3> ما يثبت ظروف الطالبة : ${withdrawalRequest.proveImage} </h3>'
        '<h3> إيصال سداد الرسوم : ${withdrawalRequest.paymentReceiptImage} </h3>'
        '<h3> الحساب البنكي : ${withdrawalRequest.bankIdImage} </h3>'
      </div>
  </body>
</html>
`;
  try {
    await SendEmail(mailOpts);
  } catch (error) {
    withdrawalRequest.deleteOne();
    await unlink(req.files.imageId[0].path);
    await unlink(req.files.proveImage[0].path);
    await unlink(req.files.paymentReceiptImage[0].path);
    await unlink(req.files.bankIdImage[0].path);
    throw new CustomErrorAPI('There is an error in sending email', StatusCodes.INTERNAL_SERVER_ERROR);
  };

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: {
      withdrawalRequest
    }
  });
});