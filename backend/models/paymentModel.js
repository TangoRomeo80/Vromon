/* This file contains the data modelling and data tier functionalities for Payments */

import mongoose from 'mongoose'
import validator from 'validator'

//Create a Payment Schema
const paymentSchema = new mongoose.Schema(
  {
    paymentParties: {
      type: String,
      required: [true, 'Payment Party is Required'],
      enum: ['B2V', 'C2B'],
    },
    paymentFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        if (this.paymentParties === 'C2B') {
          return 'User'
        } else {
          return 'Service'
        }
      },
      required: [true, 'Payment From User is Required'],
    },
    paymentToService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [
        function () {
          if (this.paymentParties === 'C2B') {
            return true
          } else {
            return false
          }
        },
        'Payment To Service is Required',
      ],
    },
    paymentForBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: [
        function () {
          if (this.paymentParties === 'C2B') {
            return true
          } else {
            return false
          }
        },
        'Payment For Booking is Required',
      ],
    },
    paymentAmount: {
      type: Number,
      required: [true, 'Payment Amount is Required'],
      validate: {
        validator: function (val) {
          return val > 0
        },
      },
    },
  },
  {
    timestamps: true,
  }
)

paymentSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: 'paymentFrom',
      select: function () {
        if (this.paymentParties === 'C2B') {
          return '-password'
        } else {
          return ''
        }
      },
    },
    {
      path: 'paymentToService',
    },
    {
      path: 'paymentForBooking',
    },
  ])
  next()
})

//Create a Payment Model
const Payment = mongoose.model('Payment', paymentSchema)

export default Payment
