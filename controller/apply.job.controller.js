import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import ApplyJob from "../models/ApplyJob.js";
import Job from "../models/Job.js";
import { setPagination } from '../utils/pagination.js';
import { unlink } from 'fs/promises';
import BadRequest from "../errors/badRequest.js";

export const addApplyJob = asyncHandler(async (req, res) => {
  if (Object.keys(req.files).length > 0) {
    if (!req.files.imgAcademicQualification)
      throw new BadRequest('Please upload imgAcademicQualification');
    if (!req.files.imgResume) {
      await unlink(req.files.imgAcademicQualification[0].path);
      throw new BadRequest('Please upload imgResume');
    }
    if (!req.files.imgIdBank) {
      await unlink(req.files.imgAcademicQualification[0].path);
      await unlink(req.files.imgResume[0].path);
      throw new BadRequest('Please upload imgIdBank');
    }
    req.body.imgAcademicQualification = `${process.env.BASE_URL}/apply-job/${req.files.imgAcademicQualification[0].filename}`;
    req.body.imgResume = `${process.env.BASE_URL}/apply-job/${req.files.imgResume[0].filename}`;
    req.body.imgIdBank = `${process.env.BASE_URL}/apply-job/${req.files.imgIdBank[0].filename}`;
  } else
    throw new BadRequest('Please upload images');
  
  const applyJob = await ApplyJob.create(req.body);
  await Job.findByIdAndUpdate(req.body.job, { $push: { applyJob: applyJob._id } });
  res.status(StatusCodes.CREATED).json({
    success: "Success",
    applyJob,
  });
});

export const getSpecificApplyJob = asyncHandler(async (req, res) => {
  const applyJob = await ApplyJob.findById(req.params.id);
  res.status(StatusCodes.OK).json({
    success: "Success",
    applyJob,
  });
});

export const getAllApplyJobsByJobId = asyncHandler(async (req, res) => {
  const { limit, pagination, skip } = await setPagination(ApplyJob, req);
  const applyJobs = await ApplyJob.find({ job: req.params.id }).limit(limit).skip(skip);
  res.status(StatusCodes.OK).json({
    success: "Success",
    count: applyJobs.length,
    pagination,
    applyJobs,
  });
});

export const deleteSpecificApplyJob = asyncHandler(async (req, res) => {
  const applyJob = await ApplyJob.findByIdAndDelete(req.params.id);
  await unlink(`./uploads/apply-job/${applyJob.imgAcademicQualification.split('/').pop()}`);
  await unlink(`./uploads/apply-job/${applyJob.imgResume.split('/').pop()}`);
  await unlink(`./uploads/apply-job/${applyJob.imgIdBank.split('/').pop()}`);
  await Job.findByIdAndUpdate(applyJob.job, { $pull: { applyJob: applyJob._id } });
  res.status(StatusCodes.OK).json({
    success: "Success",
    message: "ApplyJob deleted successfully",
  });
});