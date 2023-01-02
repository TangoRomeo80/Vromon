import React, { useState, useEffect } from 'react'
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
import Moment from 'moment'
import { TbCurrencyTaka } from 'react-icons/tb'

const TouristBookingScreen = () => {
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
  const [bookingServiceType, setBookingServiceType] = useState('transportation')

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'tourist') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (isBookingListError) {
      toast.error(bookingListErrorMessage, { position: 'top-center' })
    } else if (isBookingListSuccess) {
      setOwnedBookings(
        bookings.filter((booking) => booking.user._id === userInfo._id)
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
      <Row>
        <Col lg={3} md={12} sm={12}>
          <Card className='shadow'>
            <Card.Body>
              <Row className='mb-3'>
                <Button onClick={() => setBookingServiceType('transportation')}>
                  Transport Bookings
                </Button>
              </Row>

              <Row className='mb-3'>
                <Button onClick={() => setBookingServiceType('accomodation')}>
                  Stays Bookings
                </Button>
              </Row>

              <Row className='mb-3'>
                <Button onClick={() => setBookingServiceType('tours')}>
                  Tour Bookings
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9} md={12} sm={12}>
          <Card className='shadow'>
            <Card.Header as='h5' className='d-flex justify-content-center mb-3'>
              Bookings List and informations for{' '}
              {bookingServiceType == 'transportation'
                ? 'Transport'
                : bookingServiceType == 'accomodation'
                ? 'Stays'
                : 'Tours'}
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
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  {ownedBookings.length === 0 ? (
                    <tbody>
                      <tr>
                        <td colSpan='7' className='text-center'>
                          No Bookings Found
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {ownedBookings
                        .filter(
                          (booking) =>
                            booking.service.serviceType === bookingServiceType
                        )
                        .map((booking) => (
                          <LinkContainer
                            to={`/bookingDetailsTourist/${booking._id}`}
                          >
                            <tr key={booking._id} style={{ cursor: 'pointer' }}>
                              <td>{booking.customerInfo.customerName}</td>

                              <td>{booking.service.serviceType}</td>

                              <td>{booking.service.serviceName}</td>

                              <td>
                                {Moment(booking.bookingDate).format(
                                  'DD-MM-YYYY'
                                )}
                              </td>

                              <td>
                                BDT {booking.service.price}
                                <TbCurrencyTaka className='mb-1' />
                              </td>

                              <td>{booking.bookingStatus}</td>
                              <td>{booking.paymentStatus}</td>
                            </tr>
                          </LinkContainer>
                        ))}
                    </tbody>
                  )}
                </Table>
              )
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default TouristBookingScreen
