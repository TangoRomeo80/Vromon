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
} from '../controllers/authController.js' //import authoriztion controller

const router = express.Router() //create router instance

router.route('/signup/local').post(signupLocal)
router.route('/signin/local').post(signinLocal)
router.route('/signin/google').get(googleAuth)
router
  .route('/signin/google/redirect')
  .get(googleAuthRedirect, googleAuthResponse)
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router
