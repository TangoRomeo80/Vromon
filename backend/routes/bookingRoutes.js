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
router.route('/ssl-payment-success').get(sslPaymentSuccess)
router.route('/ssl-payment-fail').get(sslPaymentFail)
router.route('/ssl-payment-cancel').get(sslPaymentCancel)
router.route('/ssl-payment-notification').get(sslPaymentNotification)
router.route('/').get(getAllBookings).post(createBooking)
router
  .route('/:id')
  .put(updateBooking)
  .patch(updateBooking)
  .delete(deleteBooking)
  .get(getBooking)

export default router
