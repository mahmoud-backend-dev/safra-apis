import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import Report from '../models/Report.js';

export const addNoTitle = asyncHandler(async (req, res) => {
  const { name, link } = req.body;
  const { id } = req.params;
  const data = await Report.findByIdAndUpdate(
    id,
    { $addToSet: { noTitle: { name, link } } },
    { new: true }
  );
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: data.noTitle[data.noTitle.length - 1],
  });
});

export const updateNoTitle = asyncHandler(async (req, res) => {
  const { name, link } = req.body;
  const { id, noTitleId } = req.query;
  const data = await Report.findOneAndUpdate(
    { _id: id, 'noTitle._id': noTitleId },
    { $set: { 'noTitle.$.name': name, 'noTitle.$.link': link } },
    { new: true }
  );
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: data.noTitle.filter((el) => el._id == noTitleId),
  });
});

export const deleteNoTitle = asyncHandler(async (req, res) => {
  const { id, noTitleId } = req.query;
  await Report.findByIdAndUpdate(
    id,
    { $pull: { noTitle: { _id: noTitleId } } },
    { new: true }
  );
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'deleted successfully',
  });
})