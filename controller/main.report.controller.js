import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import Report from '../models/Report.js';
import { setPagination } from '../utils/pagination.js';

const filterReportToMainTitle = (report) =>
  ({ _id: report._id, mainTitle: report.mainTitle, category: report.category });

export const addMainTitle = asyncHandler(async (req, res) => {
  const { mainTitle, category } = req.body;
  const report = await Report.create({ mainTitle, category });
  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: filterReportToMainTitle(report)
  });
});

export const getAllMainTitles = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const { limit, pagination, skip } = await setPagination(Report, req);
  const reports = await Report.find({ category }).select('mainTitle')
    .limit(limit).skip(skip);
  res.status(StatusCodes.OK).json({
    status: 'success',
    count: reports.length,
    pagination,
    data: reports
  });
});

export const getAllReport = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const { limit, pagination, skip } = await setPagination(Report, req);
  const reports = await Report.find({ category })
    .limit(limit).skip(skip);
  res.status(StatusCodes.OK).json({
    status: 'success',
    count: reports.length,
    pagination,
    data: reports
  });
})

export const getSpecificReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const report = await Report.findById(id);
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: report
  });
});

export const updateMainTitle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { mainTitle } = req.body;
  const updateReport = await Report.findByIdAndUpdate(id, { mainTitle }, { new: true });
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: filterReportToMainTitle(updateReport)
  });
})

export const deleteMainTitle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Report.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'delete success'
  });
})


