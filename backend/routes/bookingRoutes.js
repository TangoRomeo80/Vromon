/* This file handles the routes related to the bookings */

import express from 'express'
import {
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  getAllBookings,
  sslRequest,
  sslPaymentSuccess,
  sslPaymentFail,
  sslPaymentCancel,
  sslPaymentNotification,
} from '../controllers/bookingController.js' //import booking controller

const router = express.Router() //create router instance

router.route('/ssl-request').get(sslRequest)
router.route('/ssl-payment-success').post(sslPaymentSuccess)
router.route('/ssl-payment-fail').post(sslPaymentFail)
router.route('/ssl-payment-cancel').post(sslPaymentCancel)
router.route('/ssl-payment-notification').post(sslPaymentNotification)
router.route('/').get(getAllBookings).post(createBooking)
router
  .route('/:id')
  .put(updateBooking)
  .patch(updateBooking)
  .delete(deleteBooking)
  .get(getBooking)

export default router
