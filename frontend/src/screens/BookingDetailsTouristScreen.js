import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col, Card, Modal } from 'react-bootstrap'
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
import Moment from 'moment'

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
    updateErrorMessage,
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
  const [showRefundPolicyModal, setShowRefundPolicyModal] = useState(false)

  const handleClose = () => setShowRefundPolicyModal(false)
  const handleShow = () => setShowRefundPolicyModal(true)

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

  useEffect(() => {
    if (isUpdateError) {
      toast.error(updateErrorMessage, { position: 'top-center' })
    } else if (isUpdateSuccess) {
      if (
        booking.bookingStatus === 'cancelled' &&
        booking.paymentRefundRequest === 'resolved'
      ) {
        toast.error('Booking cancelled', {
          position: 'top-center',
        })
      } else if (
        booking.bookingStatus === 'cancelled' &&
        booking.paymentRefundRequest === 'pending'
      ) {
        toast.warning('Please wait for the refund to be processed.', {
          position: 'top-center',
        })
      }
      navigate('/myBookings')
    }
  })

  useEffect(() => {
    return () => {
      dispatch(resetBookingDetails())
      dispatch(resetBookingUpdate())
    }
  }, [dispatch])

  const updateBookingHandler = () => {
    const bookingData = {
      customerInfo: {
        customerName,
        customerPhone,
        remarks,
      },
    }

    dispatch(
      updateBooking({
        id: params.id,
        bookingData,
      })
    )
  }

  const agreeToPolicyHandler = () => {
    const bookingData = {
      paymentRefundRequest: 'pending',
    }

    dispatch(
      updateBooking({
        id: params.id,
        bookingData,
      })
    )

    handleClose()
  }

  const refundBookingHandler = () => {
    handleShow()
  }

  const cancelBookingHandler = () => {
    const bookingData = {
      bookingStatus: 'cancelled',
    }

    dispatch(
      updateBooking({
        id: params.id,
        bookingData,
      })
    )
  }

  return (
    <Container className='pt-5'>
      {isDetailsLoading || isUpdateLoading ? (
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
                            disabled={bookingStatus === 'cancelled'}
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
                            disabled={bookingStatus === 'cancelled'}
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
                            disabled={bookingStatus === 'cancelled'}
                            as='textarea'
                            rows={4}
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className='py-4'>
                      {bookingStatus !== 'cancelled' && (
                        <Col lg={6} md={6} sm={12}>
                          <Button
                            className='d-flex justify-content-start'
                            variant='outline-success'
                            onClick={updateBookingHandler}
                          >
                            Update Booking Information
                          </Button>
                        </Col>
                      )}

                      {bookingStatus === 'cancelled' &&
                      paymentStatus === 'paid' ? (
                        <Col
                          lg={6}
                          md={6}
                          sm={12}
                          className='d-flex justify-content-start'
                        >
                          <Button
                            variant='outline-warning'
                            onClick={refundBookingHandler}
                          >
                            Request Refund
                          </Button>
                        </Col>
                      ) : bookingStatus === 'cancelled' ? null : (
                        <Col
                          lg={6}
                          md={6}
                          sm={12}
                          className='d-flex justify-content-end'
                        >
                          <Button
                            variant='outline-danger'
                            onClick={cancelBookingHandler}
                          >
                            Cancel Booking
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Modal
                show={showRefundPolicyModal}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Refund policies</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    You need to agree to the refund policies before you can
                    request a refund:
                  </p>
                  <ol>
                    <li>
                      <p>
                        Cancellations made more than 30 days prior to the
                        service availing date will receive a full refund.
                      </p>
                    </li>
                    <li>
                      <p>
                        Cancellations made between 8 and 30 days prior to the
                        service availing date will receive a 50% refund.
                      </p>
                    </li>
                    <li>
                      <p>
                        Cancellations made 7 days or less prior to the service
                        availing date are not eligible for a refund.
                      </p>
                    </li>
                    <li>
                      <p>
                        No-shows on the day of the service will not be eligible
                        for a refund.
                      </p>
                    </li>
                    <li>
                      <p>
                        If the service provicder needs to cancel the service for
                        any reason, customers will receive a full refund.
                      </p>
                    </li>
                    <li>
                      <p>
                        In the event of unforeseen circumstances, such as
                        inclement weather or natural disasters, the service
                        provider reserves the right to alter the itinerary or
                        provide a partial refund at their discretion.
                      </p>
                    </li>
                  </ol>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='primary' onClick={agreeToPolicyHandler}>
                    I agree
                  </Button>
                  <Button variant='danger' onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Row>
          </Form>
        </>
      )}
    </Container>
  )
}

export default BookingDetailsTouristScreen
