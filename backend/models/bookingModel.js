/* This file contains the data modelling and data tier functionalities for Bookings */

import mongoose from 'mongoose'
import validator from 'validator'

//Create a Booking Schema
const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is Required'],
    },
    customerInfo: {
      customerName: {
        type: String,
        required: [true, 'Customer Name is Required'],
      },
      customerPhone: {
        type: String,
        required: [true, 'Customer Phone Number is Required'],
        validate: {
          validator: function (val) {
            if (val !== '') {
              return (
                (val.length === 11 || val.length === 14) && validator.isNumeric //May need to change validator.isNumeric
              )
            } else {
              return true
            }
          },
          message:
            'Mobile number needs to be of 11 or 14 digits and can only contain numerics or + sign',
        },
      },
      remarks: {
        type: String,
        default: '',
      },
      alert: {
        type: Boolean,
        default: false,
      },
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service Type is Required'],
    },
    bookingDate: {
      type: Date,
      default: Date.now,
      required: [true, 'Booking Date is Required'],
    },
    availedDate: {
      type: Date,
      default: null,
    },
    paymentStatus: {
      type: String,
      default: 'due',
      enum: {
        values: ['due', 'paid', 'partial'],
        message: 'Payment status needs to be due, paid or partial',
      },
      required: [true, 'Payment Status is Required'],
      trim: true,
    },
    paymentAmount: {
      type: Number,
      default: 0,
      required: [
        function () {
          return this.paymentStatus === 'paid'
        },
        'Payment Amount is Required',
      ],
      trim: true,
      maxlength: [10, 'Amount Number Cannot be More Than 10 Digits'],
    },
    paymentMethod: {
      type: String,
      default: 'cash',
      required: [
        function () {
          return this.paymentStatus === 'paid'
        },
        'Payment Method is Required',
      ],
      trim: true,
      enum: {
        values: ['cash', 'card'],
        message: 'Payment Method needs to be cash or card',
      },
    },
    bookingStatus: {
      type: String,
      required: [true, 'Booking status is Required'],
      default: 'pending',
      trim: true,
      enum: {
        values: ['pending', 'booked', 'availed', 'completed', 'cancelled'],
        message:
          'Service type needs to be pending, booked, availed, completed or cancelled',
      },
    },
    paymentRefundRequest: {
      type: String,
      default: 'uninititalized',
      enum: ['uninititalized', 'resolved', 'pending', 'rejected'],
    },
  },
  {
    timestamps: true,
  }
)

//populating schema for specific id request
bookingSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: 'user',
      select: '-password',
    },
    {
      path: 'service',
    },
  ])
  next()
})

//Create Booking Model
const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
