import axios from 'axios'

//get all bookings
const getAllBookings = async (token) => {
  const response = await axios.get('/api/bookings?sort=-createdAt', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//get booking by id
const getBookingById = async (id, token) => {
  const response = await axios.get(`/api/bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//create booking
const createBooking = async (bookingData, token) => {
  const response = await axios.post('/api/bookings', bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//update booking
const updateBooking = async (id, bookingData, token) => {
  const response = await axios.patch(`/api/bookings/${id}`, bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//delete booking
const deleteBooking = async (id, token) => {
  const response = await axios.delete(`/api/bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

const bookingService = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
}

export default bookingService
