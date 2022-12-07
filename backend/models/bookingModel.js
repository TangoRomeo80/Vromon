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
      default: Date.now,
      required: [true, 'Service Availing Date is Required'],
    },
    paymentStatus: {
      type: String,
      default: 'due',
      enum: {
        values: ['due', 'paid'],
        message: 'Service type needs to be due or paid',
      },
      required: [true, 'Payment Status is Required'],
      trim: true,
    },
    paymentAmount: {
      type: Number,
      required: [true, 'Payment Amount is Required'],
      trim: true,
      maxlength: [10, 'Amount Number Cannot be More Than 10 Digits'],
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment Method is Required'],
      trim: true,
      enum: {
        values: ['cash', 'card', 'bkash', 'rocket', 'nagad'],
        message:
          'Payment Method needs to be cash, card, bkash, rocket or nagad',
      },
    },
    bookingStatus: {
      type: String,
      required: [true, 'Booking status is Required'],
      default: 'pending',
      trim: true,
      enum: {
        values: ['pending', 'booked', 'availed', 'completed'],
        message:
          'Service type needs to be pending, booked, availed or completed',
      },
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
