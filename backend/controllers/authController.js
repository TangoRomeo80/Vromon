/* This file contains the logic for handling requests for user authentication*/

import User from '../models/userModel.js' //import service data model
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import generateToken from '../utils/generateToken.js' //import JWT token generator
import passport from 'passport'

/*
  Request type: POST
  Endpoint: /api/users/signup/local
  Description: This endpoint signs up a new user locally
*/
export const signupLocal = catchAsync(async (req, res, next) => {
  const mailCheckedUser = await User.findOne({ email: req.body.email })

  if (mailCheckedUser) {
    return next(new AppError('User with this email already exists', 400))
  }

  if (req.body.userType === 'admin') {
    return next(
      new AppError('admin user can not be registered without admin access', 429)
    )
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
  Request type: POST
  Endpoint: /api/users/signin/local
  Description: This endpoint signs in a new user locally
*/
export const signinLocal = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const authedUser = await User.findOne({
    email,
  })

  if (authedUser && (await authedUser.matchPassword(password))) {
    res.status(200).json({
      status: 'success',
      data: { ...authedUser._doc, token: generateToken(authedUser._id) },
    })
  } else {
    return next(new AppError('Invalid username or password', 401))
  }
})

/*
  Request type: GET
  Endpoint: /api/users/signin/google
  Description: This endpoint gets authentication code from google
*/
export const googleAuth = passport.authenticate('google', {
  scope: ['profile'],
})

/*
  Request type: GET
  Endpoint: /api/users/signin/google/redirect
  Description: This endpoint signs in a new user using google and fetches data from google
*/
export const googleAuthRedirect = passport.authenticate('google', {
  session: false,
  successRedirect: '/api/users/signin/google/success',
  failureRedirect: '/api/users/signin/google/fail',
})

//This is the google authentication callback function
export const googleAuthCallback = async (profile, done) => {
  const { email } = profile
  //check if user exist with the email
  const user = await User.findOne({ email })
  //if user exist then send present user info
  if (user) {
    done(null, user)
  }
  //otherside create a new user
  else {
    const newUser = await User.create({
      userName: profile.displayName,
      email: profile.email,
      loginType: 'google',
      googleID: profile.id,
      image: profile.picture,
    })
    done(null, newUser)
  }
}

/*
  Request type: GET
  Endpoint: /api/users/signin/google/success
  Description: This endpoint sends back response if google authentication succeded
*/
export const googleAuthSuccess = (req, res, next) => {
  if (req.user) {
    res.status(200).json({
      status: 'success',
      data: { ...req.user._doc, token: generateToken(req.user._id) },
    })
  } else {
    next(new AppError('No user found', 401))
  }
}

/*
  Request type: GET
  Endpoint: /api/users/signin/google/fail
  Description: This endpoint sends back response if google authentication failed
*/
export const googleAuthFail = (req, res, next) => {
  return next(new AppError('Google authentication failed', 401))
}
