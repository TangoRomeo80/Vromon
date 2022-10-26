/* This file contains the logic for handling requests for user authentication*/
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js' //import service data model
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import generateToken from '../utils/generateToken.js' //import JWT token generator
import passport from 'passport'
import sendEmail from '../utils/emailHandler.js'
import crypto from 'crypto' //imprt crypto library for token hashing

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
    data: {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      loginType: newUser.loginType,
      userType: newUser.userType,
      token: generateToken(newUser._id),
    },
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
      data: {
        _id: authedUser._id,
        userName: authedUser.userName,
        email: authedUser.email,
        loginType: authedUser.loginType,
        userType: authedUser.userType,
        token: generateToken(authedUser._id),
      },
    })
  } else {
    return next(new AppError('Invalid email or password', 401))
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
    data: {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      loginType: user.loginType,
      userType: user.userType,
      newUser: user.newUser,
      token: generateToken(user._id),
    },
  })
})

/*
  Request type: Patch
  Endpoint: /api/users/auth/:id
  Description: This endpoint authorizes addition of further info for the user
*/

export const updateAuthedUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      loginType: user.loginType,
      userType: user.userType,
      newUser: user.newUser,
      token: generateToken(user._id),
    },
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
    res.redirect('http://localhost:3000/newUser?id=' + req.user._id)
  } else {
    next(new AppError('No user found or created', 401))
    res.redirect('http://localhost:3000')
  }
}

//this is a middleware that checks if the user is authenticated
export const protect = catchAsync(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    )
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    )
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser
  next()
})

//this is a middleware that checks if the user is an allowed to perform the action
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.userType)) {
      next()
    } else {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }
  }
}

/*
  Request type: POST
  Endpoint: /api/users/forgotPassword
  Description: This endpoint gives the functionality to handle forgot password functionality
*/
export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new AppError('There is no user with email address.', 404))
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  // 3) Send it to user's email

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetPassword/${resetToken}`

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    })

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })

    return next(
      new AppError(
        `${err.message} There was an error sending the email. Try again later!`
      ),
      500
    )
  }
})

/*
  Request type: POST
  Endpoint: /api/users/resetPassword/:token
  Description: This endpoint gives the functionality to handle reset password functionality
*/
export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400))
  }
  user.password = req.body.password
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  res.status(200).json({
    status: 'success',
    data: { ...user._doc, token: generateToken(user._id) },
  })
})

/*
  Request type: POST
  Endpoint: /api/users/updatePassword/:id
  Description: This endpoint gives the functionality to handle reset password functionality
*/
export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }
  const { prevPassword, newPassword } = req.body
  if (!(await user.matchPassword(prevPassword))) {
    return next(new AppError('Your current password is wrong.', 401))
  }
  if (prevPassword === newPassword) {
    return next(
      new AppError('New password cannot be same as old password', 400)
    )
  }
  user.password = newPassword
  await user.save()
  res.status(200).json({
    status: 'success',
    data: { ...user._doc, token: generateToken(user._id) },
  })
})
