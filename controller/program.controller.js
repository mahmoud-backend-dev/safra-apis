import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import Program from "../models/Program.js";
import Department from "../models/Department.js";
import Student from "../models/Student.js";

export const addProgram = asyncHandler(async (req, res) => {
  const program = await Program.create(req.body);
  await Department.findByIdAndUpdate(
    req.body.department,
    { $addToSet: { programs: program?._id } }
  );
  res.status(StatusCodes.CREATED)
    .json({
      status: "Success",
      program,
    });
});

export const getAllProgram = asyncHandler(async (req, res) => {
  const allProgram = await Program.find({}).populate({
    path: 'students',
    select:'ID name'
  })
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      count: allProgram.length,
      allProgram
    });
});

export const getSpecificProgram = asyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id).populate({
    path: 'students',
    select:'ID name programs.degree programs.evaluation programs.file programs.id'
  })
  program.students.forEach(student => {
    student.programs = student.programs.filter(program => program.id == req.params.id)
  })
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      program
    });
});

export const updateSpecificProgram = asyncHandler(async (req, res) => { 
  const updateProgram = await Program.findByIdAndUpdate(
    req.params.id,
    {
      ID: req.body.ID,
      name: req.body.name,
      department: req.body.department,
    },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      updateProgram
    });
});

export const deleteSpecificProgram = asyncHandler(async (req, res) => {
  const program = await Program.findByIdAndRemove(req.params.id);
  await Department.findByIdAndUpdate(
    program.department,
    { $pull: { programs: program?._id } },
    { new: true, runValidators: true }
  );
  await Student.updateMany(
    { "programs.id": program?._id },
    { $pull: { programs: { id: program?._id } } },
    { new: true, runValidators: true }
  )
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      message: "Program deleted successfully"
    });
});