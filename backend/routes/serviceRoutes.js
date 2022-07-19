/* This file handles the routes related to the services*/

import express from 'express' //import express

import {
  getAllServices,
  getService,
  createService,
} from '../controllers/serviceController.js' //import service controller

const router = express.Router() //create router instanceof

router.route('/').get(getAllServices).post(createService)
router.route('/:id').get(getService)

export default router
