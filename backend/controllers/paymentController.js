/* This file contains the logic for handling requests and communicating with the payment data model*/

import Payment from '../models/paymentModel.js' //import payment data model

import {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
} from './handlerFactory.js' //import generic handler

/*
  Request type: GET
  Endpoint: /api/payments/
  Description: This endpoint returns all payments
*/

export const getAllPayments = getAll(Payment)

/*
  Request type: GET
  Endpoint: /api/payments/:id
  Description: This endpoint returns payment with :id
*/

export const getPayment = getOne(Payment)

/*
  Request type: POST
  Endpoint: /api/payments/
  Description: This endpoint creates a new payment
*/

export const createPayment = createOne(Payment)

/*
  Request type: PATCH
  Endpoint: /api/payments/:id
  Description: This endpoint updates a specific payment
*/

export const updatePayment = updateOne(Payment)

/*
  Request type: DELETE
  Endpoint: /api/payments/:id
  Description: This endpoint deletes a specific payment
*/

export const deletePayment = deleteOne(Payment)