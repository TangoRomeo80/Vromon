/* This file handles the routes related to the payments*/

import express from 'express' //import express

import {
  getAllPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
} from '../controllers/paymentController.js' //import payment controller

const router = express.Router() //create router instance

router.route('/').get(getAllPayments).post(createPayment)
router
  .route('/:id')
  .get(getPayment)
  .patch(updatePayment)
  .put(updatePayment)
  .delete(deletePayment)

export default router
