/* This file contains the logic for handling requests and communicating with the Business data model*/
import { SslCommerzPayment } from 'sslcommerz'

import Booking from '../models/bookingModel.js'
import catchAsync from '../utils/catchAsync.js'
// import AppError from '../utils/appError.js'
import {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} from './handlerFactory.js' //import generic handler

// Request type: POST
// Endpoint: /api/bookings/
// Description: This endpoint creates new bookings

export const createBooking = createOne(Booking)

// Request type: PATCH
// Endpoint: /api/bookings/:id
// Description: This endpoint updates specific bookings

export const updateBooking = updateOne(Booking)

// Request type: DELETE
// Endpoint: /api/bookings/:id
// Description: This endpoint deletes specific bookings

export const deleteBooking = deleteOne(Booking)

// Request type: GET
// Endpoint: /api/bookings/
// Description: This endpoint gets all bookings

export const getAllBookings = getAll(Booking)

// Request type: GET
// Endpoint: /api/bookings/:id
// Description: This endpoint gets specific booking info

export const getBooking = getOne(Booking, [
  { path: 'user', select: '-password' },
  { path: 'service' },
])

// Request type: GET
// Endpoint: /api/bookings/ssl-request
// Description: This endpoint initiates sslcommerz payment session

export const sslRequest = catchAsync(async (req, res) => {
  const queryString = req.query
  const { bookingId } = queryString

  const booking = await Booking.findById(bookingId)
  const serviceType =
    booking.service.serviceType === 'accomodation'
      ? 'stays'
      : booking.service.serviceType === 'transportation'
      ? 'transport'
      : 'tours'

  /**
   * Create ssl session request
   */

  const data = {
    total_amount: booking.service.price,
    currency: 'BDT',
    tran_id: 'REF123',
    success_url: `${process.env.ROOT}/api/bookings/ssl-payment-success?bookingId=${bookingId}&serviceType=${serviceType}&status=success&amount=${booking.service.price}&serviceId=${booking.service._id}`,
    fail_url: `${process.env.ROOT}/api/bookings/ssl-payment-fail?bookingId=${bookingId}&&serviceType=${serviceType}&status=fail&serviceId=${booking.service._id}`,
    cancel_url: `${process.env.ROOT}/api/bookings/ssl-payment-cancel?bookingId=${bookingId}&&serviceType=${serviceType}&status=cancel&serviceId=${booking.service._id}`,
    shipping_method: 'No',
    product_name: booking.service.serviceName,
    product_category: booking.service.serviceType,
    product_profile: 'general',
    cus_name: booking.user.userName,
    cus_email: booking.user.email,
    cus_add1: booking.user.touristInfo.address.house,
    cus_add2: booking.user.touristInfo.address.street,
    cus_city: booking.user.touristInfo.address.area,
    cus_state: booking.user.touristInfo.address.city,
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: booking.user.mobile,
    cus_fax: booking.user.mobile,
    multi_card_name: 'mastercard',
    value_a: 'ref001_A',
    value_b: 'ref002_B',
    value_c: 'ref003_C',
    value_d: 'ref004_D',
    ipn_url: `${process.env.ROOT}/ssl-payment-notification`,
  }

  const sslcommerz = new SslCommerzPayment(
    process.env.SSL_STORE_ID,
    process.env.SSL_STORE_PASSWORD,
    false
  ) //true for live default false for sandbox

  sslcommerz.init(data).then((data) => {
    //process the response that got from sslcommerz

    if (data?.GatewayPageURL) {
      return res.status(200).redirect(data?.GatewayPageURL)
    } else {
      return res.status(400).json({
        message: 'Session was not successful',
      })
    }
  })
})

// Request type: POST
// Endpoint: /api/bookings/ssl-payment-success
// Description: This endpoint handles sslcommerz payment success

export const sslPaymentSuccess = catchAsync(async (req, res) => {
  //Handle payment success
  const { bookingId, status, serviceType, amount, serviceId } = req.query

  res
    .status(200)
    .redirect(
      `${process.env.CLIENT}/${serviceType}Booking/${serviceId}?bookingId=${bookingId}&status=${status}&amount=${amount}`
    )
})

// Request type: POST
// Endpoint: /api/bookings/ssl-payment-fail
// Description: This endpoint handles sslcommerz payment fail

export const sslPaymentFail = catchAsync(async (req, res) => {
  //Handle payment fail
  const { bookingId, serviceType, status, serviceId } = req.query

  res
    .status(200)
    .redirect(
      `${process.env.CLIENT}/${serviceType}Booking/${serviceId}?bookingId=${bookingId}&status=${status}`
    )
})

// Request type: POST
// Endpoint: /api/bookings/ssl-payment-cancel
// Description: This endpoint handles sslcommerz payment cancel

export const sslPaymentCancel = catchAsync(async (req, res) => {
  //Handle payment cancel
  const { bookingId, serviceType, status, serviceId } = req.query

  res
    .status(200)
    .redirect(
      `${process.env.CLIENT}/${serviceType}Booking/${serviceId}?bookingId=${bookingId}&status=${status}`
    )
})

// Request type: POST
// Endpoint: /api/bookings/ssl-payment-notification
// Description: This endpoint handles sslcommerz payment notification

export const sslPaymentNotification = catchAsync(async (req, res) => {
  //Handle payment notification

  res.status(200).json({
    data: req.body,
    message: 'Payment notification',
  })
})
