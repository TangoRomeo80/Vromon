/* This file contains the data modelling and data tier functionalities for Bookings */

import mongoose from 'mongoose'

//Create a Booking Schema
const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is Required'],
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service Type is Required'],
    },
    bookingDate: {
      type: Date,
      required: [true, 'Booking Date is Required'],
    },
    availedDate: {
      type: Date,
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
bookingSchema.pre('findOne', function (next) {
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
