import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaUser, FaServicestack, FaEdit, FaTrash } from 'react-icons/fa'
import { TbCurrencyTaka } from 'react-icons/tb'
import { FcCancel } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import StatCard from '../components/StatCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllBookings,
  resetBookingList,
} from '../features/booking/bookingSlice'
import {
  getAllBusinesses,
  resetBusinessList,
} from '../features/business/businessSlice'
import {
  getAllServices,
  resetServiceList,
} from '../features/service/serviceSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Moment from 'moment'

const BusinessOwnerDashoard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    bookings,
    isListLoading: isBookingListLoading,
    isListSuccess: isBookigListSuccess,
    isListError: isBookingListError,
    listErrorMessage: bookingListErrorMessage,
  } = useSelector((state) => state.booking)

  const {
    businesses,
    isListLoading: isBusinessListLoading,
    isListSuccess: isBusinessListSuccess,
    isListError: isBusinessListError,
    listErrorMessage: businessListErrorMessage,
  } = useSelector((state) => state.business)

  const {
    services,
    isListLoading: isServiceListLoading,
    isListSuccess: isServiceListSuccess,
    isListError: isServiceListError,
    listErrorMessage: serviceListErrorMessage,
  } = useSelector((state) => state.service)

  const [ownedServices, setOwnedServices] = useState([])
  const [newBookings, setNewBookings] = useState([])
  const [confirmedBookings, setConfirmedBookings] = useState([])
  const [ownedBookings, setOwnedBookings] = useState([])
  const [ownedBusinesses, setOwnedBusinesses] = useState([])

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
    } else if (isBookigListSuccess) {
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
    isBookigListSuccess,
    bookings,
    userInfo,
    dispatch,
  ])

  useEffect(() => {
    if (isBusinessListError) {
      toast.error(businessListErrorMessage, { position: 'top-center' })
    } else if (isBusinessListSuccess) {
      setOwnedBusinesses(
        businesses.filter(
          (business) => business.businessOwner._id === userInfo._id
        )
      )
    } else {
      dispatch(getAllBusinesses())
    }
  }, [
    isBusinessListError,
    businessListErrorMessage,
    isBusinessListSuccess,
    businesses,
    userInfo,
    dispatch,
  ])

  useEffect(() => {
    if (isServiceListError) {
      toast.error(serviceListErrorMessage, { position: 'top-center' })
    } else if (isServiceListSuccess) {
      setOwnedServices(
        services.filter(
          (service) => service.business.businessOwner._id === userInfo._id
        )
      )
    } else {
      dispatch(getAllServices())
    }
  }, [
    isServiceListError,
    serviceListErrorMessage,
    isServiceListSuccess,
    services,
    userInfo,
    dispatch,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetBookingList())
      dispatch(resetBusinessList())
      dispatch(resetServiceList())
    }
  }, [dispatch])

  return (
    <Container className='py-3'>
      <Row className='my-4'>
        <Col lg={6} sm={12} md={12}>
          <StatCard
            linkTo='/bookingRequestList'
            data={bookings ? newBookings.length : 0}
            description='New Booking Requests'
            bgColor='success'
            width='30'
            loading={isBookingListLoading ? true : false}
            error={isBookingListError ? bookingListErrorMessage : null}
            imgSrc='./newBooking.png'
          />
        </Col>
        <Col lg={6} sm={12} md={12}>
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
                <Table bordered hover responsive className='table-sm'>
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
                          <td>{booking.user.userName}</td>

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

      <Row className='my-4'>
        <Col lg={12} sm={12} md={12}>
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
                <Table bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Service Type</th>
                      <th>Service Name</th>
                      <th>Booking Date</th>
                      <th>Booking Fare</th>
                      <th>Cancel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmedBookings.map((booking) => (
                      <LinkContainer
                        to={`/bookingDetailsBusiness/${booking._id}`}
                      >
                        <tr key={booking._id} style={{ cursor: 'pointer' }}>
                          <td>{booking.user.userName}</td>

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
                            <Button variant='danger' className='btn-sm'>
                              Cancel
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

      <Row className='mt-5'>
        {/* Left Table */}
        <Col lg={6} md={6} sm={12}>
          <Card>
            <Card.Header as='h5' className='d-flex justify-content-center my-3'>
              Recent Services
            </Card.Header>
            {isServiceListLoading ? (
              <Loader />
            ) : isServiceListError ? (
              <Message variant='danger'>{serviceListErrorMessage}</Message>
            ) : (
              services && (
                <Table bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>Service Type</th>
                      <th>Service Name</th>
                      <th>Location</th>
                      <th>Contact</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ownedServices.map((service, index) => (
                      <>
                        {index < 5 && (
                          <LinkContainer
                            to={
                              service.serviceType === 'transportation'
                                ? `/transportDetailsBusiness/${service._id}`
                                : service.serviceType === 'accomodation'
                                ? `/staysDetailsBusiness/${service._id}`
                                : `/tourDetailsBusiness/${service._id}`
                            }
                          >
                            <tr key={service._id} style={{ cursor: 'pointer' }}>
                              <td>{service.serviceType}</td>

                              <td>{service.serviceName}</td>

                              <td>
                                {service.destination.district},
                                {service.destination.division}
                              </td>

                              <td>{service.serviceMobileNumber}</td>

                              <td>
                                <Button variant='info' className='btn-sm'>
                                  <FaEdit />
                                </Button>
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
          </Card>
        </Col>

        {/* Right Table */}
        <Col lg={6} md={6} sm={12}>
          <Card>
            <Card.Header as='h5' className='d-flex justify-content-center my-3'>
              Recent Businesses
            </Card.Header>
            {isBusinessListLoading ? (
              <Loader />
            ) : isBusinessListError ? (
              <Message variant='danger'>{businessListErrorMessage}</Message>
            ) : (
              businesses && (
                <Table bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>Business Name</th>
                      <th>Address</th>
                      <th>Contact</th>
                      <th>Website</th>
                      <th>TIN Number</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ownedBusinesses.map((business, index) => (
                      <>
                        {index < 5 && (
                          <LinkContainer
                            to={`/businessDetails/${business._id}`}
                          >
                            <tr
                              key={business._id}
                              style={{ cursor: 'pointer' }}
                            >
                              <td>{business.businessName}</td>
                              <td>{business.businessAddress}</td>
                              <td>{business.businessPhone}</td>
                              <td>{business.businessWebsite}</td>
                              <td>{business.businessTIN}</td>
                              <td>
                                <Button variant='info' className='btn-sm'>
                                  <FaEdit />
                                </Button>
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
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default BusinessOwnerDashoard
