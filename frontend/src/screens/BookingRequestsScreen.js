import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllBookings,
  resetBookingList,
} from '../features/booking/bookingSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import StatCard from '../components/StatCard'
import Moment from 'moment'
import { TbCurrencyTaka } from 'react-icons/tb'

const BookingRequestsScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    bookings,
    isListLoading: isBookingListLoading,
    isListSuccess: isBookingListSuccess,
    isListError: isBookingListError,
    listErrorMessage: bookingListErrorMessage,
  } = useSelector((state) => state.booking)

  const [ownedBookings, setOwnedBookings] = useState([])
  const [newBookings, setNewBookings] = useState([])
  const [confirmedBookings, setConfirmedBookings] = useState([])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'businessowner') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (isBookingListError) {
      toast.error(bookingListErrorMessage, { position: 'top-center' })
    } else if (isBookingListSuccess) {
      setOwnedBookings(
        bookings.filter(
          (booking) =>
            booking.service.business.businessOwner._id === userInfo._id
        )
      )
      setNewBookings(
        bookings.filter(
          (booking) =>
            booking.service.business.businessOwner._id === userInfo._id &&
            booking.bookingStatus === 'booked'
        )
      )
      setConfirmedBookings(
        bookings.filter(
          (booking) =>
            booking.service.business.businessOwner._id === userInfo._id &&
            booking.bookingStatus === 'availed'
        )
      )
    } else {
      dispatch(getAllBookings())
    }
  }, [
    isBookingListError,
    bookingListErrorMessage,
    isBookingListSuccess,
    bookings,
    userInfo,
    dispatch,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetBookingList())
    }
  }, [dispatch])

  return (
    <Container className='py-3'>
      <Row>
        <Col className='d-flex justify-content-center'>
          <h1>Bookings</h1>
        </Col>
      </Row>
      <Row className='my-4'>
        <Col lg={4} sm={12} md={4} className='d-flex justify-content-center'>
          <StatCard
            linkTo='#'
            data={bookings ? newBookings.length : 0}
            description='New Booking Requests'
            bgColor='success'
            width='25'
            loading={isBookingListLoading ? true : false}
            error={isBookingListError ? bookingListErrorMessage : null}
            imgSrc='./newBooking.png'
          />
        </Col>
        <Col lg={4} sm={12} md={4} className='d-flex justify-content-center'>
          <StatCard
            linkTo='#'
            data={bookings ? confirmedBookings.length : 0}
            description='Confirmed Booking Requests'
            bgColor='warning'
            width='25'
            loading={isBookingListLoading ? true : false}
            error={isBookingListError ? bookingListErrorMessage : null}
            imgSrc='./newBooking.png'
          />
        </Col>
        <Col lg={4} sm={12} md={4} className='d-flex justify-content-center'>
          <StatCard
            linkTo='#'
            data={bookings ? ownedBookings.length : 0}
            description='All Booking Requests'
            bgColor='primary'
            width='25'
            loading={isBookingListLoading ? true : false}
            error={isBookingListError ? bookingListErrorMessage : null}
            imgSrc='./newBooking.png'
          />
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col lg={6} md={6} sm={12} className='d-flex justify-content-center'>
          <Card>
            <Card.Header as='h5' className='d-flex justify-content-center mb-3'>
              New Bookings List
            </Card.Header>
            {isBookingListLoading ? (
              <Loader />
            ) : isBookingListError ? (
              <Message variant='danger'>{bookingListErrorMessage}</Message>
            ) : (
              bookings && (
                <Table
                  bordered
                  hover
                  responsive
                  className='table-sm overflow-auto'
                  style={{ maxHeight: '20vh' }}
                >
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Service Type</th>
                      <th>Service Name</th>
                      <th>Booking Date</th>
                      <th>Booking Fare</th>
                      <th>Accept/Cancel</th>
                    </tr>
                  </thead>

                  <tbody>
                    {newBookings.map((booking) => (
                      <LinkContainer
                        to={`/bookingDetailsBusiness/${booking._id}`}
                      >
                        <tr key={booking._id} style={{ cursor: 'pointer' }}>
                          <td>{booking.customerInfo.customerName}</td>

                          <td>{booking.service.serviceType}</td>

                          <td>{booking.service.serviceName}</td>

                          <td>
                            {Moment(booking.bookingDate).format('DD-MM-YYYY')}
                          </td>

                          <td>
                            BDT {booking.service.price}
                            <TbCurrencyTaka className='mb-1' />
                          </td>

                          <td>
                            <Button variant='success' className='btn-sm'>
                              Accept/Cancel
                            </Button>
                          </td>
                        </tr>
                      </LinkContainer>
                    ))}
                  </tbody>
                </Table>
              )
            )}
          </Card>
        </Col>
        <Col lg={6} md={6} sm={12} className='d-flex justify-content-center'>
          <Card>
            <Card.Header as='h5' className='d-flex justify-content-center mb-3'>
              Confirmed Bookings List
            </Card.Header>
            {isBookingListLoading ? (
              <Loader />
            ) : isBookingListError ? (
              <Message variant='danger'>{bookingListErrorMessage}</Message>
            ) : (
              bookings && (
                <Table
                  bordered
                  hover
                  responsive
                  className='table-sm overflow-auto'
                  style={{ maxHeight: '20vh' }}
                >
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Service Type</th>
                      <th>Service Name</th>
                      <th>Booking Date</th>
                      <th>Booking Fare</th>
                      <th>Accept/Cancel</th>
                    </tr>
                  </thead>

                  <tbody>
                    {confirmedBookings.map((booking) => (
                      <LinkContainer
                        to={`/bookingDetailsBusiness/${booking._id}`}
                      >
                        <tr key={booking._id} style={{ cursor: 'pointer' }}>
                          <td>{booking.customerInfo.customerName}</td>

                          <td>{booking.service.serviceType}</td>

                          <td>{booking.service.serviceName}</td>

                          <td>
                            {Moment(booking.bookingDate).format('DD-MM-YYYY')}
                          </td>

                          <td>
                            BDT {booking.service.price}
                            <TbCurrencyTaka className='mb-1' />
                          </td>

                          <td>
                            <Button variant='success' className='btn-sm'>
                              Accept/Cancel
                            </Button>
                          </td>
                        </tr>
                      </LinkContainer>
                    ))}
                  </tbody>
                </Table>
              )
            )}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <Card>
            <Card.Header as='h5' className='d-flex justify-content-center mb-3'>
              All Bookings List
            </Card.Header>
            {isBookingListLoading ? (
              <Loader />
            ) : isBookingListError ? (
              <Message variant='danger'>{bookingListErrorMessage}</Message>
            ) : (
              bookings && (
                <Table
                  bordered
                  hover
                  responsive
                  className='table-sm overflow-auto'
                  style={{ maxHeight: '20vh' }}
                >
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Service Type</th>
                      <th>Service Name</th>
                      <th>Booking Date</th>
                      <th>Booking Fare</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((booking) => (
                      <LinkContainer
                        to={`/bookingDetailsBusiness/${booking._id}`}
                      >
                        <tr key={booking._id} style={{ cursor: 'pointer' }}>
                          <td>{booking.customerInfo.customerName}</td>

                          <td>{booking.service.serviceType}</td>

                          <td>{booking.service.serviceName}</td>

                          <td>
                            {Moment(booking.bookingDate).format('DD-MM-YYYY')}
                          </td>

                          <td>
                            BDT {booking.service.price}
                            <TbCurrencyTaka className='mb-1' />
                          </td>

                          <td>
                            {booking.bookingStatus}
                          </td>
                        </tr>
                      </LinkContainer>
                    ))}
                  </tbody>
                </Table>
              )
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default BookingRequestsScreen
