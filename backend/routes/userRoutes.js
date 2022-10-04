/* This file handles the routes related to the users*/

import express from 'express' //import express

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js' //import User controller

import {
  signupLocal,
  signinLocal,
  googleAuth,
  googleAuthRedirect,
  googleAuthResponse,
  getAuthedUser,
  protect,
  restrictTo,
  forgotPassword,
} from '../controllers/authController.js' //import authoriztion controller

const router = express.Router() //create router instance

router.route('/signup/local').post(signupLocal) //signup user locally
router.route('/signin/local').post(signinLocal) //signin users locally
router.route('/signin/google').get(googleAuth) //sigin using google
router
  .route('/signin/google/redirect') //google's redirect route
  .get(googleAuthRedirect, googleAuthResponse)
router.route('/auth/:id').get(getAuthedUser) //route to get data from external source, i.e: google

router.route('/forgotPassword').post(forgotPassword) //route to handle forgot password

//base CRUD functionality for admin only
router.route('/').get(getAllUsers).post(createUser)
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .put(updateUser)
  .delete(deleteUser)

export default router
