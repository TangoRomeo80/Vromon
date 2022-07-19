/* This file handles the routes related to the services*/

import express from 'express' //import express

import {
  getAllServices,
  createService,
} from '../controllers/serviceController.js' //import service controller

const router = express.Router() //create router instanceof

router.route('/').get(getAllServices).post(createService)

export default router
