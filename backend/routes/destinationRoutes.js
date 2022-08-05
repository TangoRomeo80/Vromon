/* This file handles the routes related to the destinations */

import express from 'express' //import express
import {
  createDestination,
  updateDestination,
  deleteDestination,
  getAllDestinations,
  getDestination,
} from '../controllers/destinationController.js' //import destination controller

const router = express.Router() //create router instance

router.route('/').get(getAllDestinations).post(createDestination)
router
  .route('/:id')
  .get(getDestination)
  .patch(updateDestination)
  .put(updateDestination)
  .delete(deleteDestination)

export default router
