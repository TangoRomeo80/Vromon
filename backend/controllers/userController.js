/* This file contains the logic for handling requests and communicating with the user data model*/

import User from '../models/userModel.js' //import service data model
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handlerFactory.js' //import generic handler

/*
  Request type: GET
  Endpoint: /api/users/
  Description: This endpoint returns all users
*/

export const getAllUsers = getAll(User)
/*
  Request type: GET
  Endpoint: /api/users/:id
  Description: This endpoint returns user with :id
*/

export const getUser = getOne(User)

/*
  Request type: POST
  Endpoint: /api/users/
  Description: This endpoint creates a new user
*/

export const createUser = catchAsync(async (req, res, next) => {
  const mailCheckedUser = await User.findOne({ email: req.body.email })

  if (mailCheckedUser) {
    return next(new AppError('User with this email already exists', 400))
  }

  if (req.body.userType !== 'admin') {
    return next(new AppError('Only admin user can be created manually', 429))
  }

  const newUser = await User.create(req.body)

  if (!newUser) {
    return next(new AppError('No new user could be created', 429))
  }

  res.status(201).json({
    status: 'success',
    data: newUser,
  })
})

/*
  Request type: PATCH
  Endpoint: /api/users/:id
  Description: This endpoint updates a specific user
*/

export const updateUser = updateOne(User)

/*
  Request type: GET
  Endpoint: /api/users/getMe
  Description: This endpoint gets the logged in user info
*/

export const getMe = (req, res, next) => { 
  req.params.id = req.user._id
  next()
}

/*
  Request type: PATCH
  Endpoint: /api/users/updateMe
  Description: This endpoint updates info about currently logged in user
*/

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    )
  }

  // 2) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  })
})

/*
  Request type: DELETE
  Endpoint: /api/users/deleteMe
  Description: This endpoint deletes info about currently logged in user
*/

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id)

  res.status(204).json({
    status: 'success',
    data: null,
  })
})

/*
  Request type: DELETE
  Endpoint: /api/users/:id
  Description: This endpoint deletes a specific user
*/

export const deleteUser = deleteOne(User)
