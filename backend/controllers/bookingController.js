/* This file contains the logic for handling requests and communicating with the Business data model*/

import Booking from '../models/bookingModel.js'
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

export const getBooking = getOne(Booking, 
    [
        {path: 'user', select: '-password'},
        {path: 'service'}
    ])