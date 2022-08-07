/* This file handles the routes related to the businesses */

import express from 'express'
import {
    createBusiness,
    updateBusiness,
    deleteBusiness,
    getAllBusinesses,
    getBusiness,
} from '../controllers/businessController.js' //import Business controller

const router = express.Router() //create router instance

router.route('/').get(getAllBusinesses).post(createBusiness)
router.route('/:id').get(getBusiness).put(updateBusiness).patch(updateBusiness).delete(deleteBusiness)

export default router