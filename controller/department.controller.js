import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import Department from "../models/Department.js";
import Program from "../models/Program.js";

export const addDepartment = asyncHandler(async (req, res) => {
  const department = await Department.create(req.body);
  res.status(StatusCodes.CREATED)
    .json({
      status: "Success",
      department,
    });
});

export const getAllDepartment = asyncHandler(async (req, res) => {
  const allDepartment = await Department.find({}).populate({
    path: 'programs',
    select: 'ID name'
  })
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      count: allDepartment.length,
      allDepartment
    });
});

export const getSpecificDepartMent = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id).populate({
    path: 'programs',
    select: 'ID name'
  });
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      department
    });
});

export const updateSpecificDepartment = asyncHandler(async (req, res) => {
  const updateDepartment = await Department.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      updateDepartment
    });
});

export const deleteSpecificDepartment = asyncHandler(async (req, res) => {
  await Department.findByIdAndDelete(req.params.id);
  await Program.deleteMany({ department: req.params.id });
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      message:"Department deleted successfully"
    });
})