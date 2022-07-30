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
  Endpoint: /api/users/auth/:id
  Description: This endpoint authorizes the third party authorized user data and returns them with a a JWT token 
*/
export const getAuthedUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id) //method using mongoose findById

  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: { ...user._doc, token: generateToken(user._id) },
  })
})

/*
  Request type: GET
  Endpoint: /api/users/signin/google
  Description: This endpoint gets authentication code from google
*/
export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
})

/*
  Request type: GET
  Endpoint: /api/users/signin/google/redirect
  Description: This endpoint signs in a new user using google and fetches data from google
*/
export const googleAuthRedirect = passport.authenticate('google', {
  session: false,
})

//This is the google authentication callback function
export const googleAuthCallback = async (profile, done) => {
  const email = profile.emails[0].value
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
      email: profile.emails[0].value,
      loginType: 'google',
      googleID: profile.id,
      image: profile.photos[0].value,
    })
    done(null, newUser)
  }
}

/*
  Request type: GET
  Endpoint: /api/users/signin/google/redirect
  Description: This endpoint sends back response if google authentication succeeded
*/
export const googleAuthResponse = (req, res, next) => {
  if (req.user) {
    res.redirect('http://localhost:3000?id=' + req.user._id)
  } else {
    next(new AppError('No user found or created', 401))
  }
}
