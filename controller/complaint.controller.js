import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import { setPagination } from '../utils/pagination.js';
import Complaint from "../models/Complaint.js";

export const addComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: "Success",
    complaint,
  });
});

export const deleteSpecificComplaint = asyncHandler(async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({
    success: "Success",
    message: "Complaint deleted successfully",
  });
});

export const getSpecificComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  res.status(StatusCodes.OK).json({
    success: "Success",
    complaint,
  });
})

export const getAllComplaints = asyncHandler(async (req, res) => {
  const { limit, pagination, skip } = await setPagination(req, Complaint);
  const complaints = await Complaint.find().limit(limit).skip(skip);
  res.status(StatusCodes.OK).json({
    success: "Success",
    count: complaints.length, 
    pagination,
    complaints,
  });
})

