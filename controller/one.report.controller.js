import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import Report from '../models/Report.js';

export const addOneTitle = asyncHandler(async (req, res) => {
  const { subTitle, arrOfPDFs } = req.body;
  const { id } = req.params;
  const oneTitle = await Report.findByIdAndUpdate(
    id,
    {
      subTitle,
      $addToSet: {
        oneTitle:
        {
          subTitle,
          arrOfPDFs, 
        }
      }
    },
    { new: true }
  );
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: oneTitle.oneTitle[oneTitle.oneTitle.length - 1],
  });
});

export const addOneTitlePdf = asyncHandler(async (req, res) => {
  const { id, oneTitleId } = req.query;
  const { name, link } = req.body;
  const oneTitle = await Report.findOneAndUpdate(
    { _id: id, 'oneTitle._id': oneTitleId },
    { $addToSet: { 'oneTitle.$.arrOfPDFs': { name, link } } },
    { new: true }
  );
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: oneTitle.oneTitle.filter((el) => el._id == oneTitleId),
  });
})

export const updateOneTitle = asyncHandler(async (req, res) => {
  const { id, oneTitleId,idPdf } = req.query;
  const { subTitle, name, link } = req.body;
  const oneTitle = await Report.findOneAndUpdate(
    {
      _id: id,
      'oneTitle._id': oneTitleId,
      'oneTitle.arrOfPDFs._id': idPdf
    },
    {
      $set: {
        'oneTitle.$.subTitle': subTitle,
        'oneTitle.$.arrOfPDFs.$[pdf].name': name,
        'oneTitle.$.arrOfPDFs.$[pdf].link': link
      }
    },
    { new: true, arrayFilters: [{ 'pdf._id': idPdf }] }
  );
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: oneTitle.oneTitle.filter((el) => el._id == oneTitleId),
  });
});

export const deleteOneTitle = asyncHandler(async (req, res) => {
  const { id, oneTitleId } = req.query;
  await Report.findByIdAndUpdate(
    id,
    { $pull: { oneTitle: { _id: oneTitleId } } },
    { new: true }
  );
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'deleted successfully',
  });
});

export const deleteOneTitlePdf = asyncHandler(async (req, res) => {
  const { id, oneTitleId, idPdf } = req.query;
  await Report.findOneAndUpdate(
    { _id: id, 'oneTitle._id': oneTitleId },
    { $pull: { 'oneTitle.$.arrOfPDFs': { _id: idPdf } } },
    { new: true }
  );
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'deleted successfully',
  });
});