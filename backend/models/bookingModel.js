/* This file contains the data modelling and data tier functionalities for Bookings */

import mongoose from 'mongoose'

//Create a Booking Schema
const bookingSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, 'User ID is Required']
        },
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: [true, 'Service Type is Required']
        },
        bookingDate: {
            type: Date,
            required: [true, 'Booking Date is Required']
        },
        availedDate: {
            type: Date,
            required: [true, 'Service Availing Date is Required']
        },
        paymentStatus: {
            type: String,
            required: [true, 'Payment Status is Required'],
            trim: true,
        },
        paymentAmount: {
            type: Number,
            required: [true, 'Payment Amount is Required'],
            trim: true,
            maxlength: [10, 'Amount Number Cannot be More Than 10 Digits']
        },
        bookingStatus: {
            type: String,
            required: [true, 'Booking status is Required'],
            trim: true,
        }
    },
    {
        timestamps: true
    }
)


//Create Booking Model
const Booking = mongoose.model('Booking',bookingSchema)

export default Booking