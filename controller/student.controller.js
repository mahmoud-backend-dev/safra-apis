import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import Student from "../models/Student.js";
import { unlink } from "fs/promises";
import BadRequest from "../errors/badRequest.js";
import { setPagination } from "../utils/pagination.js";
import Program from "../models/Program.js";

export const addStudent = asyncHandler(async (req, res) => {
  let student = await Student.findOne({ ID: req.body.ID });
  const program = await Program.findOne({ ID: req.body.programId });
  if (req.file) {
    req.body.programs = { file: `${process.env.BASE_URL}/certificate/${req.file.filename}` };
  }
  const { programId, degree, evaluation } = req.body;
  req.body.programs = {
    ...req.body.programs,
    id: program?._id,
    programId,
    degree,
    evaluation
  };
  if (student) {
    student.programs.forEach((item) => {
      if (item.programId == req.body.programId) {
        throw new BadRequest(`Student ID: ${req.body.ID} is already exist in this program`);
      }
    });
    student = await Student.findOneAndUpdate(
      { ID: req.body.ID },
      { $addToSet: { programs: req.body.programs } },
      { new: true, runValidators: true }
    );
    await Program.findOneAndUpdate(
      { ID: programId },
      { $addToSet: { students: student?._id } }
    );
    return res.status(StatusCodes.CREATED).json({
      status: "Success",
      student
    });
  }
  student = await Student.create(req.body);
  await Program.findOneAndUpdate(
    { ID: programId },
    { $addToSet: { students: student?._id } }
  );
  res.status(StatusCodes.CREATED).json({
    status: "Success",
    student
  });
});

export const getStudentData = asyncHandler(async (req, res) => {
  // Get Courses depend on program and student ID
  const student = await Student.findOne({ ID: req.query.ID }).populate({
    path: 'programs.id',
    select:'name'
  })
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      ID: student?.ID,
      programs: student?.programs
    })
});

export const updateStudentData = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ ID: req.query.ID });
  if (req.file) {
    const program = student.programs.find((item) => item.programId == req.query.programId);
    req.body.file = `${process.env.BASE_URL}/certificate/${req.file.filename}`;
    if (program.file)
      await unlink(`./uploads/certificate/${program.file.split('/').pop()}`)
  }
  student.programs.forEach((item) => {
    if (item.programId == req.query.programId) {
      // Update item properties directly
      if (req.body.degree)
        item.degree = req.body.degree;
      if (req.body.evaluation)
        item.evaluation = req.body.evaluation;
      if (req.body.file)
        item.file = req.body.file;
    }
  });
  if (req.body.ID) {
    if (req.body.ID == student.ID)
      student.ID = req.body.ID;
    else {
      const studentExist = await Student.findOne({ ID: req.body.ID });
      if (studentExist)
        throw new BadRequest(`ID: ${req.body.ID} is already exist, please choose another ID`);
      student.ID = req.body.ID;
    }
  }
  if (req.body.name) {
    student.name = req.body.name;
  }
  await student.save();
  res.status(StatusCodes.OK).json({
    status: "Success",
    student
  });
});

export const deleteSpecificStudentCourse = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ ID: req.query.ID });
  student.programs = student.programs.filter((item) => item.programId != req.query.programId);
  await Program.findOneAndUpdate(
    { ID: req.query.programId },
    { $pull: { students: student?._id } }
  );
  await student.save();
  res.status(StatusCodes.OK).json({
    status: "Success",
    student
  });
});

export const getSpecificStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  student.programs = student.programs.filter((item) => item.id == req.params.progId);
  res.status(StatusCodes.OK).json({
    status: "Success",
    student
  });
});

export const getAllStudent = asyncHandler(async (req, res) => {
  const { limit, pagination, skip } = await setPagination(Student, req);
  const students = await Student.find({}).limit(limit).skip(skip);
  res.status(StatusCodes.OK).json({
    status: "Success",
    count: students.length,
    pagination,
    students
  });
});

