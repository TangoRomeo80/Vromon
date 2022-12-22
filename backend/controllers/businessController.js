/* This file contains the logic for handling requests and communicating with the Business data model*/
import { SslCommerzPayment } from 'sslcommerz'
import catchAsync from '../utils/catchAsync.js'

import Business from '../models/businessModel.js'

import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handlerFactory.js' //import generic handler

/* 
Request type: POST
Endpoint: /api/businesses/
Description: This endpoint creates new business
*/

export const createBusiness = createOne(Business)

/*  
Request type: PATCH
Endpoint: /api/businesses/:id
Description: This endpoint updates specific business
*/

export const updateBusiness = updateOne(Business)

/*
Request type: DELETE
Endpoint: /api/businesses/:id
Description: This endpoint deletes a specific business
*/
export const deleteBusiness = deleteOne(Business)

/*
Request type: GET
Endpoint: /api/businesses/
Description: This endpoint returns all Businesses
*/

export const getAllBusinesses = getAll(Business)

/*
Request type: GET
Endpoint: /api/businesses/:id
Description: This endpoint returns a businesses with :id
*/

export const getBusiness = getOne(Business)

// Request type: GET
// Endpoint: /api/business/ssl-request
// Description: This endpoint initiates sslcommerz payment session

export const sslRequest = catchAsync(async (req, res) => {
  const queryString = req.query
  const { businessId } = queryString

  const business = await Business.findById(businessId)

  /**
   * Create ssl session request
   */
  const data = {
    total_amount: business.duePaymentAmount,
    currency: 'BDT',
    tran_id: 'REF123',
    success_url: `${process.env.ROOT}/api/businesses/ssl-payment-success?businessId=${businessId}&status=success&amount=${business.duePaymentAmount}`,
    fail_url: `${process.env.ROOT}/api/businesses/ssl-payment-fail?businessId=${businessId}&status=fail&amount=${business.duePaymentAmount}`,
    cancel_url: `${process.env.ROOT}/api/businesses/ssl-payment-cancel?businessId=${businessId}&status=cancel&amount=${business.duePaymentAmount}`,
    shipping_method: 'No',
    product_name: business.businessName,
    product_category: business.businessName,
    product_profile: 'general',
    cus_name: business.businessOwner.userName,
    cus_email: business.businessOwner.email,
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: business.businessOwner.mobile,
    cus_fax: business.businessOwner.mobile,
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
// Endpoint: /api/businesses/ssl-payment-success
// Description: This endpoint handles sslcommerz payment success

export const sslPaymentSuccess = catchAsync(async (req, res) => {
  //Handle payment success
  const { businessId, status, amount } = req.query

  res
    .status(200)
    .redirect(
      `${process.env.CLIENT}/businessDetails/${businessId}?status=${status}&amount=${amount}`
    )
})

// Request type: POST
// Endpoint: /api/businesses/ssl-payment-fail
// Description: This endpoint handles sslcommerz payment fail

export const sslPaymentFail = catchAsync(async (req, res) => {
  //Handle payment fail
  const { businessId, status, amount } = req.query

  res
    .status(200)
    .redirect(
      `${process.env.CLIENT}/businessDetails/${businessId}?status=${status}&amount=${amount}`
    )
})

// Request type: POST
// Endpoint: /api/businesses/ssl-payment-cancel
// Description: This endpoint handles sslcommerz payment cancel

export const sslPaymentCancel = catchAsync(async (req, res) => {
  //Handle payment cancel
  const { businessId, status, amount } = req.query

  res
    .status(200)
    .redirect(
      `${process.env.CLIENT}/businessDetails/${businessId}?status=${status}&amount=${amount}`
    )
})

// Request type: POST
// Endpoint: /api/businesses/ssl-payment-notification
// Description: This endpoint handles sslcommerz payment notification

export const sslPaymentNotification = catchAsync(async (req, res) => {
  //Handle payment notification

  res.status(200).json({
    data: req.body,
    message: 'Payment notification',
  })
})
