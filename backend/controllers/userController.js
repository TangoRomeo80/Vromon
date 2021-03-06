/* This file contains the logic for handling requests and communicating with the user data model*/

import User from '../models/userModel.js' //import service data model
import APIFeatures from '../utils/apiFeatures.js' //import API feature utility
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import bcrypt from 'bcryptjs' //import bcrypt for password hashing

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
  Endpoint: /api/users/:id
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
export const updateUser = catchAsync(async (req, res, next) => {
  let user = req.body
  if (user.password) {
    if (user.password.length < 6) {
      return next(new AppError('Password must be at least 6 characters', 400))
    }
    const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS * 1)
    user.password = await bcrypt.hash(user.password, salt)
  }
  const upadtedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!upadtedUser) {
    return next(new AppError('No user found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: upadtedUser,
  })
})

/*
  Request type: DELETE
  Endpoint: /api/users/:id
  Description: This endpoint deletes a specific user
*/
export const deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id)

  if (!deletedUser) {
    return next(new AppError('No user found with that ID', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
})
