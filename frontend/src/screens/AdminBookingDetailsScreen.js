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
import {
  updateBusiness,
  resetBusinessUpdate,
} from '../features/business/businessSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Moment from 'moment'

const BookingDetailsBusinessScreen = () => {
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
    isUpdateLoading: isBookingUpdateLoading,
    isUpdateError: isBookingUpdateError,
    isUpdateSuccess: isBookingUpdateSuccess,
    updateErrorMessage: bookingUpdateErrorMessage,
  } = useSelector((state) => state.booking)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'admin') {
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
  const [paymentRefundRequest, setPaymentRefundRequest] = useState('')

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
      setPaymentRefundRequest(booking.paymentRefundRequest)
    } else {
      dispatch(getBookingById(params.id))
    }
  }, [dispatch, booking, isDetailsSuccess, isDetailsError, detailsErrorMessage])

  useEffect(() => {
    if (isBookingUpdateError) {
      toast.error(bookingUpdateErrorMessage, { position: 'top-center' })
    } else if (isBookingUpdateSuccess) {
      if (booking.paymentRefundRequest === 'resolved') {
        toast.success('Refund request resolved', {
          position: 'top-center',
        })
      } else if (booking.paymentRefundRequest === 'rejected') {
        toast.error('Refund request rejected', {
          position: 'top-center',
        })
      }
      navigate('/adminBookingList')
    }
  })

  useEffect(() => {
    return () => {
      dispatch(resetBookingDetails())
      dispatch(resetBookingUpdate())
      dispatch(resetBusinessUpdate())
    }
  }, [dispatch])

  const confirmRefundHandler = () => {
    const bookingData = {
      paymentRefundRequest: 'resolved',
    }
    dispatch(
      updateBooking({
        id: booking._id,
        bookingData,
      })
    )
  }

  const rejectRefundHandler = () => {
    const bookingData = {
      paymentRefundRequest: 'rejected',
    }
    dispatch(
      updateBooking({
        id: booking._id,
        bookingData,
      })
    )
  }

  return (
    <Container className='pt-5'>
      {isDetailsLoading || isBookingUpdateLoading ? (
        <Loader />
      ) : isDetailsError ? (
        <Message variant='danger'>{detailsErrorMessage}</Message>
      ) : (
        <>
          <Row className='pb-5'>
            <Card.Text as='h2' className='font-weight-bolder text-center'>
              Booking Information
            </Card.Text>
          </Row>

          <Form>
            <Row>
              <Col xs={12} md={12} xl={12}>
                <Card className='mb-4'>
                  <Card.Header>Booking Information</Card.Header>
                  <Card.Body>
                    <Row>
                      <h5 className='font-weight-bolder text-muted mb-3'>
                        Customer Information
                      </h5>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className='mb-3' controlId='customerName'>
                          <Form.Label className='small mb-1'>
                            Full Name
                          </Form.Label>
                          <Form.Control
                            disabled
                            type='text'
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className='mb-3' controlId='customerPhone'>
                          <Form.Label className='small mb-1'>
                            Phone No.
                          </Form.Label>
                          <Form.Control
                            disabled
                            type='text'
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className='font-weight-bolder text-muted mb-3'>
                      Service Information
                    </h5>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className='mb-3' controlId='serviceType'>
                          <Form.Label className='small mb-1'>
                            Service Type
                          </Form.Label>
                          <Form.Control
                            disabled
                            type='select'
                            as='select'
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                          >
                            <option disabled selected value=''>
                              Select Service Type
                            </option>
                            <option value='Transportation'>Transport</option>
                            <option value='Stays'>Stays</option>
                            <option value='Tours'>Tours</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>

                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className='mb-3' controlId='serviceName'>
                          <Form.Label className='small mb-1'>
                            Service Name
                          </Form.Label>
                          <Form.Control
                            disabled
                            type='text'
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className='font-weight-bolder text-muted mb-3'>
                      Booking Information
                    </h5>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className='mb-3' controlId='bookingDate'>
                          <Form.Label className='small mb-1'>
                            Booking Date
                          </Form.Label>
                          <Form.Control
                            type='text'
                            disabled
                            value={Moment(bookingDate).format('DD/MM/YYYY')}
                            onChange={(e) => setBookingDate(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className='mb-3' controlId='availedDate'>
                          <Form.Label className='small mb-1'>
                            Availed Date
                          </Form.Label>
                          <Form.Control
                            type='texte'
                            disabled
                            value={Moment(availedDate).format('DD/MM/YYYY')}
                            onChange={(e) => setAvailedDate(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className='mb-3' controlId='bookingPrice'>
                          <Form.Label className='small mb-1'>
                            Booking Price
                          </Form.Label>
                          <Form.Control
                            type='text'
                            disabled
                            value={bookingPrice}
                            onChange={(e) => setBookingPrice(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className='mb-3' controlId='bookingStatus'>
                          <Form.Label className='small mb-1'>
                            Booking Status
                          </Form.Label>
                          <Form.Control
                            as='select'
                            type='select'
                            disabled
                            value={bookingStatus}
                            onChange={(e) => setBookingStatus(e.target.value)}
                          >
                            <option disabled selected value=''>
                              Select Booking Status
                            </option>
                            <option value='pending'>Pending</option>
                            <option value='booked'>Booked</option>
                            <option value='availed'>Availed</option>
                            <option value='completed'>Completed</option>
                            <option value='cancelled'>Cancelled</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className='font-weight-bolder text-muted mb-3'>
                      Payment Information
                    </h5>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className='mb-3' controlId='paymentMethod'>
                          <Form.Label className='small mb-1'>
                            Payment Method
                          </Form.Label>
                          <Form.Control
                            as='select'
                            type='select'
                            disabled
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          >
                            <option disabled selected value=''>
                              Select Payment Method
                            </option>
                            <option value='cash'>Cash</option>
                            <option value='card'>Card</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className='mb-3' controlId='paymentStatus'>
                          <Form.Label className='small mb-1'>
                            Payment Status
                          </Form.Label>
                          <Form.Control
                            as='select'
                            type='select'
                            disabled
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                          >
                            <option disabled selected value=''>
                              Select Payment Status
                            </option>
                            <option value='pending'>Pending</option>
                            <option value='paid'>Paid</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group className='mb-3' controlId='remarks'>
                          <Form.Label className='small mb-1'>
                            Remarks
                          </Form.Label>
                          <Form.Control
                            as='textarea'
                            rows={4}
                            disabled
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className='py-4'>
                      {paymentRefundRequest === 'pending' && (
                        <>
                          <Col
                            lg={6}
                            md={6}
                            sm={12}
                            className='d-flex justify-content-start'
                          >
                            <Button
                              variant='outline-success'
                              onClick={confirmRefundHandler}
                            >
                              Confirm Refund
                            </Button>
                          </Col>
                          <Col
                            lg={6}
                            md={6}
                            sm={12}
                            className='d-flex justify-content-end'
                          >
                            <Button
                              variant='outline-danger'
                              onClick={rejectRefundHandler}
                            >
                              Reject Refund Request
                            </Button>
                          </Col>
                        </>
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Container>
  )
}

export default BookingDetailsBusinessScreen
