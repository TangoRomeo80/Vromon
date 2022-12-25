/* This file contains the data modelling and data tier functionalities for Payments */

import mongoose from 'mongoose'
import validator from 'validator'

//Create a Payment Schema
const paymentSchema = new mongoose.Schema(
  {
    paymentParties: {
      type: String,
      required: [true, 'Payment Party is Required'],
      enum: ['C2B', 'B2V', 'V2C'],
      default: 'C2B',
    },
    paymentFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        if (this.paymentParties === 'C2B') {
          return 'User'
        } else {
          return 'Business'
        }
      },
      required: [
        function () {
          if (this.paymentParties === 'V2C') {
            return false
          } else {
            return true
          }
        },
        'Payment From User is Required',
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
    paymentForBusiness: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: [
        function () {
          if (this.paymentParties === 'B2V') {
            return true
          } else {
            return false
          }
        },
        'Payment For Business is Required',
      ],
    },

    paymentForCustomer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [
        function () {
          if (this.paymentParties === 'V2C') {
            return true
          } else {
            return false
          }
        },
        'Payment For Customer is Required',
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
    paymentMethod: {
      type: String,
      default: 'cash',
      required: [true, 'Payment Method is Required'],
      trim: true,
      enum: {
        values: ['cash', 'card'],
        message: 'Payment Method needs to be cash or card',
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
    },
    {
      path: 'paymentForBusiness',
    },
    {
      path: 'paymentForBooking',
    },
    {
      path: 'paymentForCustomer',
    },
  ])
  next()
})

//Create a Payment Model
const Payment = mongoose.model('Payment', paymentSchema)

export default Payment
