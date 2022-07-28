/* This file contains the logic for handling requests and communicating with the user data model*/

import User from '../models/userModel.js' //import service data model
import APIFeatures from '../utils/apiFeatures.js' //import API feature utility
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

/*
  Request type: GET
  Endpoint: /api/users/
  Description: This endpoint returns all users
*/
export const getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
  const users = await features.query

  if (users.length < 1) {
    return next(new AppError('No users found', 404))
  }

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  })
})

/*
  Request type: GET
  Endpoint: /api/services/:id
  Description: This endpoint returns user with :id
*/
export const getUser = catchAsync(async (req, res, next) => {
  // User.findOne({ _id: req.params.id }) //method using mongodb findOne
  const user = await User.findById(req.params.id) //method using mongoose findById
  
  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: user,
  })
})


