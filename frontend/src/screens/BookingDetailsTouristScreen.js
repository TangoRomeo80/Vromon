import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  getBookingById,
  updateBooking,
  resetBookingDetails,
  resetBookingUpdate,
} from '../features/booking/bookingSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

const BookingDetailsTouristScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    booking,
    isDetailsLoading,
    isDetailsError,
    isDetailsSuccess,
    detailsErrorMessage,
    isUpdateLoading,
    isUpdateError,
    isUpdateSuccess,
    updateErrorMessag,
  } = useSelector((state) => state.booking)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'tourist') {
      navigate('/')
    }
  }, [userInfo, navigate])

  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [availedDate, setAvailedDate] = useState('')
  const [bookingPrice, setBookingPrice] = useState('')
  const [remarks, setRemarks] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [bookingStatus, setBookingStatus] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: 'top-center' })
    } else if (isDetailsSuccess) {
      setCustomerName(booking.customerInfo.customerName)
      setCustomerPhone(booking.customerInfo.customerPhone)
      setServiceType(booking.service.serviceType)
      setServiceName(booking.service.serviceName)
      setBookingDate(booking.bookingDate)
      setAvailedDate(booking.availedDate)
      setBookingPrice(booking.service.price)
      setRemarks(booking.customerInfo.remarks)
      setPaymentMethod(booking.paymentMethod)
      setBookingStatus(booking.bookingStatus)
      setPaymentStatus(booking.paymentStatus)
    } else {
      dispatch(getBookingById(params.id))
    }
  }, [dispatch, booking, isDetailsSuccess, isDetailsError, detailsErrorMessage])

  return <div>BookingDetailsTouristScreen</div>
}

export default BookingDetailsTouristScreen
