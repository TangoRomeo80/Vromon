/* This file handles the routes related to the businesses */

import express from 'express'
import {
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getAllBusinesses,
  getBusiness,
  sslRequest,
  sslPaymentSuccess,
  sslPaymentFail,
  sslPaymentCancel,
  sslPaymentNotification,
} from '../controllers/businessController.js' //import Business controller

const router = express.Router() //create router instance

router.route('/ssl-request').get(sslRequest)
router.route('/ssl-payment-success').post(sslPaymentSuccess)
router.route('/ssl-payment-fail').post(sslPaymentFail)
router.route('/ssl-payment-cancel').post(sslPaymentCancel)
router.route('/ssl-payment-notification').post(sslPaymentNotification)
router.route('/').get(getAllBusinesses).post(createBusiness)
router
  .route('/:id')
  .get(getBusiness)
  .put(updateBusiness)
  .patch(updateBusiness)
  .delete(deleteBusiness)

export default router
