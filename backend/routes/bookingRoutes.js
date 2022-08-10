/* This file handles the routes related to the bookings */

import express from 'express'
import {
    createBooking,
    updateBooking,
    deleteBooking,
    getBooking,
    getAllBookings
} from '../controllers/bookingController.js' //import booking controller

const router = express.Router() //create router instance

router.route('/').get(getAllBookings).post(createBooking)
router.route('/:id').put(updateBooking).patch(updateBooking).delete(deleteBooking).get(getBooking)