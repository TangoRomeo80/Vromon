/* This file handles the routes related to the users*/

import express from 'express' //import express

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js' //import User controller

const router = express.Router() //create router instance

router.route('/signup/local').post((req, res) => {
  res.send('user will be registered')
})

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router
