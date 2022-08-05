/* This file handles the routes related to the services*/

import express from 'express' //import express

import {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
  getMostPopularServices,
} from '../controllers/serviceController.js' //import service controller

const router = express.Router() //create router instance

router.route('/').get(getAllServices).post(createService)
router.route('/most-popular').get(getMostPopularServices, getAllServices)
router
  .route('/:id')
  .get(getService)
  .patch(updateService)
  .put(updateService)
  .delete(deleteService)

export default router
