import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import { setPagination } from '../utils/pagination.js';
import Job from "../models/Job.js";
import { unlink } from 'fs/promises';
import ApplyJob from "../models/ApplyJob.js";

const sanitizeJob = (job) => ({ name: job.name, image: job.image, status: job.status })

export const addJob = asyncHandler(async (req, res) => {
  const job = await Job.create({
    name: req.body.name,
    image: `${process.env.BASE_URL}/jobs/${req.file.filename}`,
  });
  res.status(StatusCodes.CREATED).json({
    success: "Success",
    job: sanitizeJob(job),
  });
});

export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (req.file) {
    await unlink(`./uploads/jobs/${job.image.split('/').pop()}`);
    job.image = `${process.env.BASE_URL}/jobs/${req.file.filename}`;
  }
  if (req.body.name) {
    job.name = req.body.name;
  }
  await job.save();
  res.status(StatusCodes.OK).json({
    success: "Success",
    job: sanitizeJob(job),
  });
});

export const getSpecificJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({
    success: "Success",
    job: sanitizeJob(job),
  });
});

export const getAllJobs = asyncHandler(async (req, res) => {
  const { limit, pagination, skip } = await setPagination(Job, req);
  const jobs = await Job.find().limit(limit).skip(skip);
  res.status(StatusCodes.OK).json({
    success: "Success",
    count: jobs.length, 
    pagination,
    jobs: jobs.map(job => sanitizeJob(job)),
  });
})

export const deleteSpecificJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndRemove(req.params.id);
  await unlink(`./uploads/jobs/${job.image.split('/').pop()}`);
  if(job.applyJob.length > 0) {
    await Promise.all(job.applyJob.forEach(async (idApplyJob) => {
      const applyJob = await ApplyJob.findByIdAndRemove(idApplyJob);
      await unlink(`./uploads/apply-job/${applyJob.imgAcademicQualification.split('/').pop()}`);
      await unlink(`./uploads/apply-job/${applyJob.imgResume.split('/').pop()}`);
      await unlink(`./uploads/apply-job/${applyJob.imgIdBank.split('/').pop()}`);
    }))
  }
  res.status(StatusCodes.OK).json({
    success: "Success",
    message: "Job deleted successfully",
  });
});