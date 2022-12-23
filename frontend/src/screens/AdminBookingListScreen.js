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
import Moment from 'moment'
import { TbCurrencyTaka } from 'react-icons/tb'

const AdminBookingListScreen = () => {
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

  const [customerNameSearch, setCustomerNameSearch] = useState('')
  const [serviceNameSearch, setServiceNameSearch] = useState('')

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'admin') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (isBookingListError) {
      toast.error(bookingListErrorMessage, { position: 'top-center' })
    } else if (!isBookingListSuccess) {
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

  return (
    <Container className='py-3'>
      <Row>
        <Col className='d-flex justify-content-center'>
          <h1>Bookings</h1>
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
                        // to={`/adminBookingDetail/${booking._id}`}
                        to='#'
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

                          <td>{booking.bookingStatus}</td>
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

export default AdminBookingListScreen
