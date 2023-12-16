import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import New from "../models/New.js";
import { setPagination } from '../utils/pagination.js';
import { unlink } from 'fs/promises';

export const addNew = asyncHandler(async (req, res) => {
  req.body.image = `${process.env.BASE_URL}/landing-page/news/${req.file.filename}`;
  const newNew = await New.create(req.body);
  res.status(StatusCodes.CREATED)
    .json({
      status: "Success",
      newNew,
    });
});

export const deleteNew = asyncHandler(async (req, res) => {
  const deletedNew = await New.findByIdAndDelete(req.params.id);
  await unlink(`./uploads/landing-page/news/${deletedNew.image.split('/').pop()}`);
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      message: 'new deleted successfully',
    });
});

export const getAllNew = asyncHandler(async (req, res) => {
  const { limit, pagination, skip } = await setPagination(New, req);
  const allNews = await New.find({ type: req.query.type }).limit(limit).skip(skip);
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      pagination,
      count: allNews.length,
      allNews
    });
});

export const updateNew = asyncHandler(async (req, res) => {
  if (req.file) {
    const specificNew = await New.findById(req.params.id);
    req.body.image = `${process.env.BASE_URL}/landing-page/news/${req.file.filename}`;
    await unlink(`./uploads/landing-page/news/${specificNew.image.split('/').pop()}`);
  }
  const updateNew = await New.findByIdAndUpdate(
    req.params.id,
    {
      date: req.body.date,
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      type: req.body.type,
    },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      updateNew
    });
});

export const getSpecificNew = asyncHandler(async (req, res) => {
  const specificNew = await New.findById(req.params.id);
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      new: specificNew,
    });
});

export const getAllNewsWithoutType = asyncHandler(async (req, res) => {
  const { limit, pagination, skip } = await setPagination(New, req);
  const allNews = await New.find({}).limit(limit).skip(skip);
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      pagination,
      count: allNews.length,
      allNews
    });
});