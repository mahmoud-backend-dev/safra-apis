import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';

import User from "../models/User.js";
import BadRequest from "../errors/badRequest.js";
import UnauthenticatedError from "../errors/unauthenticated.js";
import { sanitizeData } from "../utils/sanitizeData.js";

export const allowTo = (...roles) => asyncHandler(async (req, res,next) => {
  if (!roles.includes(req.user.role))
    throw new UnauthenticatedError('You are not allowed to access this route')
  next();
}); 

export const signup = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);

  await user.hashedPass();
  await user.save();
  const token = user.createJWTForAuthorization();

  res.status(StatusCodes.CREATED)
    .json({
      status: 'Success',
      token,
      user: sanitizeData(user)
    });
});

export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });


  const isMatch = await user?.comparePass(req.body.password);

  if (!user || !isMatch)
    throw new BadRequest('email or password incorrect');

  const token = user.createJWTForAuthorization();
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      token,
      user: sanitizeData(user)
    });
}); 