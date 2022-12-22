import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import StatCard from '../components/StatCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, resetUserList } from '../features/user/userSlice'
import { TbCurrencyTaka } from 'react-icons/tb'
import {
  getAllBookings,
  resetBookingList,
} from '../features/booking/bookingSlice'
import {
  getAllServices,
  resetServiceList,
} from '../features/service/serviceSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Moment from 'moment'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    users,
    isListLoading: isUserListLoading,
    isListSuccess: isUserListSuccess,
    isListError: isUserListError,
    listErrorMessage: userListErrorMessage,
  } = useSelector((state) => state.user)

  const {
    bookings,
    isListLoading: isBookingListLoading,
    isListSuccess: isBookigListSuccess,
    isListError: isBookingListError,
    listErrorMessage: bookingListErrorMessage,
  } = useSelector((state) => state.booking)

  const {
    services,
    isListLoading: isServiceListLoading,
    isListSuccess: isServiceListSuccess,
    isListError: isServiceListError,
    listErrorMessage: serviceListErrorMessage,
  } = useSelector((state) => state.service)

  const [tourists, setTourists] = useState([])
  const [businessOwners, setBusinessOwners] = useState([])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'admin') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (isUserListError) {
      toast.error(userListErrorMessage, {
        position: 'top-center',
      })
    } else if (isUserListSuccess) {
      const touristsList = users.filter((user) => user.userType === 'tourist')
      const businessOwnersList = users.filter(
        (user) => user.userType === 'businessowner'
      )
      setTourists(touristsList)
      setBusinessOwners(businessOwnersList)
    } else {
      dispatch(getAllUsers())
    }
  }, [
    isUserListError,
    isUserListSuccess,
    userListErrorMessage,
    users,
    dispatch,
  ])

  useEffect(() => {
    if (isBookingListError) {
      toast.error(bookingListErrorMessage, {
        position: 'top-center',
      })
    } else if (!isBookigListSuccess) {
      dispatch(getAllBookings())
    }
  }, [
    isBookingListError,
    isBookigListSuccess,
    bookingListErrorMessage,
    dispatch,
  ])

  useEffect(() => {
    if (isServiceListError) {
      toast.error(serviceListErrorMessage, {
        position: 'top-center',
      })
    } else if (!isServiceListSuccess) {
      dispatch(getAllServices())
    }
  }, [
    isServiceListError,
    isServiceListSuccess,
    serviceListErrorMessage,
    dispatch,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetUserList())
      dispatch(resetBookingList())
      dispatch(resetServiceList())
    }
  }, [dispatch])

  return (
    <Container className='py-3'>
      <Row>
        <Col className='d-flex justify-content-center'>
          <h1>Dashboard</h1>
        </Col>
      </Row>
      <Row className='my-4'>
        <Col lg={3} md={3} sm={6}>
          <StatCard
            linkTo='/adminUserList'
            data={users ? tourists.length : 0}
            description='Total Tourists registered'
            bgColor='primary'
            width='20'
            loading={isUserListLoading ? true : false}
            error={isUserListError ? userListErrorMessage : null}
            imgSrc='./tourist.png'
          />
        </Col>
        <Col lg={3} md={3} sm={6}>
          <StatCard
            linkTo='/adminUserList'
            data={users ? businessOwners.length : 0}
            description='BusinessOwners registered'
            bgColor='secondary'
            width='20'
            loading={isUserListLoading ? true : false}
            error={isUserListError ? userListErrorMessage : null}
            imgSrc='./businessOwner.png'
          />
        </Col>
        <Col lg={3} md={3} sm={6}>
          <StatCard
            linkTo='/adminServiceList'
            data={services ? services.length : 0}
            description='Services Registered'
            bgColor='info'
            width='20'
            loading={isServiceListLoading ? true : false}
            error={isServiceListError ? serviceListErrorMessage : null}
            imgSrc='./service.png'
          />
        </Col>
        <Col lg={3} md={3} sm={6}>
          <StatCard
            linkTo='/adminBookingList'
            data={bookings ? bookings.length : 0}
            description='Services Booked'
            bgColor='warning'
            width='20'
            loading={isBookingListLoading ? true : false}
            error={isBookingListError ? bookingListErrorMessage : null}
            imgSrc='./booking.png'
          />
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col lg={6} md={6} sm={12}>
          <Card>
            <Card.Header as='h5' className='d-flex justify-content-center my-3'>
              Recent Bookings
            </Card.Header>
          </Card>
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
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking, index) => (
                    <>
                      {index < 5 && (
                        <LinkContainer
                          to={`/bookingDetailsAdmin/${booking._id}`}
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
                          </tr>
                        </LinkContainer>
                      )}
                    </>
                  ))}
                </tbody>
              </Table>
            )
          )}
        </Col>
        <Col lg={6} md={6} sm={12}>
          <Card>
            <Card.Header as='h5' className='d-flex justify-content-center my-3'>
              Recent Services
            </Card.Header>
          </Card>
          {isServiceListLoading ? (
            <Loader />
          ) : isServiceListError ? (
            <Message variant='danger'>{serviceListErrorMessage}</Message>
          ) : (
            services && (
              <Table
                bordered
                hover
                responsive
                className='table-sm overflow-auto'
                style={{ maxHeight: '20vh' }}
              >
                <thead>
                  <tr>
                    <th>Service Type</th>
                    <th>Service Name</th>
                    <th>Location</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <>
                      {index < 5 && (
                        <LinkContainer
                          to={`/serviceDetailsAdmin/${service._id}`}
                        >
                          <tr key={service._id} style={{ cursor: 'pointer' }}>
                            <td>{service.serviceType}</td>
                            <td>{service.serviceName}</td>
                            <td>{service.location}</td>
                            <td>{service.contact}</td>
                          </tr>
                        </LinkContainer>
                      )}
                    </>
                  ))}
                </tbody>
              </Table>
            )
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard
