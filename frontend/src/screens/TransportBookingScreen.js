import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { MdLocationOn, MdDateRange } from 'react-icons/md'
import { TbCurrencyTaka } from 'react-icons/tb'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'moment'
import {
  getTransportById,
  resetServiceDetails,
} from '../features/service/serviceSlice'
import {
  updateBooking,
  createBooking,
  deleteBooking,
  resetBookingDetails,
  resetBookingCreate,
  resetBookingUpdate,
  resetBookingDelete,
} from '../features/booking/bookingSlice'
import {
  createPayment,
  resetPaymentCreate,
} from '../features/payment/paymentSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'

const TransportBookingScreen = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const trannsportId = useParams().id

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    transport,
    isDetailsLoading: isTransportDetailsLoading,
    isDetailsSuccess: isTransportDetailsSuccess,
    isDetailsError: isTransportDetailsError,
    detailsErrorMessage: transportDetailsErrorMessage,
  } = useSelector((state) => state.service)

  const {
    booking,
    isCreateLoading: isBookingCreateLoading,
    isCreateSuccess: isBookingCreateSuccess,
    isCreateError: isBookingCreateError,
    createErrorMessage: bookingCreateErrorMessage,
    isUpdateLoading: isBookingUpdateLoading,
    isUpdateSuccess: isBookingUpdateSuccess,
    isUpdateError: isBookingUpdateError,
    updateErrorMessage: bookingUpdateErrorMessage,
    isDeleteLoading: isBookingDeleteLoading,
    isDeleteSuccess: isBookingDeleteSuccess,
    isDeleteError: isBookingDeleteError,
    deleteErrorMessage: bookingDeleteErrorMessage,
  } = useSelector((state) => state.booking)

  const {
    payment,
    isCreateLoading: isPaymentCreateLoading,
    isCreateSuccess: isPaymentCreateSuccess,
    isCreateError: isPaymentCreateError,
    createErrorMessage: paymentCreateErrorMessage,
  } = useSelector((state) => state.payment)

  const [transportDetail, setTransportDetail] = useState({})
  const [customerName, setCustomerName] = useState('')
  const [guestCount, setGuestCount] = useState(1)
  const [customerPhone, setCustomerPhone] = useState('')
  const [remarks, setRemarks] = useState('')
  const [alert, setAlert] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')

  const handleClose = () => setShowBookingModal(false)
  const handleShow = () => setShowBookingModal(true)

  useEffect(() => {
    if (!userInfo) {
      toast.error('Please Login to Continue', {
        position: 'top-center',
      })
      navigate('/login')
    } else if (userInfo && userInfo.userType !== 'tourist') {
      toast.error('Only Tourist can book a stay service', {
        position: 'top-center',
      })
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (searchParams.get('status')) {
      if (searchParams.get('status') === 'success') {
        if (searchParams.get('paymentMethod') === 'card') {
          dispatch(
            updateBooking({
              id: searchParams.get('bookingId'),
              bookingData: {
                paymentStatus: 'paid',
                paymentAmount: searchParams.get('amount') * 1,
                paymentMethod: 'card',
                bookingStatus: 'booked',
              },
            })
          )
        } else if (searchParams.get('paymentMethod') === 'cash') {
          dispatch(
            updateBooking({
              id: searchParams.get('bookingId'),
              bookingData: {
                paymentStatus: 'partial',
                paymentAmount: searchParams.get('amount') * 1,
                paymentMethod: 'cash',
                bookingStatus: 'booked',
              },
            })
          )
        }
        dispatch(
          createPayment({
            paymentParties: 'C2B',
            paymentMethod: 'card',
            paymentAmount: searchParams.get('amount') * 1,
            paymentFrom: userInfo._id,
            paymentForBooking: searchParams.get('bookingId'),
          })
        )
        toast.success('Payment Successful, Booking Completed', {
          position: 'top-center',
        })
      } else if (searchParams.get('status') === 'fail') {
        dispatch(deleteBooking(searchParams.get('bookingId')))
        toast.error('Payment Failed, booking Cancelled', {
          position: 'top-center',
        })
      } else if (searchParams.get('status') === 'cancel') {
        dispatch(deleteBooking(searchParams.get('bookingId')))
        toast.error('Payment Cancelled, booking Cancelled', {
          position: 'top-center',
        })
      }
    }
  }, [])

  useEffect(() => {
    if (isTransportDetailsError) {
      toast.error(transportDetailsErrorMessage, { position: 'top-center' })
    } else if (isTransportDetailsSuccess) {
      setTransportDetail(transport)
    } else {
      dispatch(getTransportById(trannsportId))
    }
  }, [dispatch, trannsportId])

  useEffect(() => {
    if (isBookingCreateError) {
      toast.error(bookingCreateErrorMessage, { position: 'top-center' })
    } else if (isBookingUpdateError) {
      toast.error(bookingUpdateErrorMessage, { position: 'top-center' })
    } else if (isBookingDeleteError) {
      toast.error(bookingDeleteErrorMessage, { position: 'top-center' })
    } else if (isBookingCreateSuccess) {
      handleShow()
    }
  }, [dispatch, isBookingCreateError, isBookingCreateSuccess])

  useEffect(() => {
    if (isPaymentCreateError) {
      toast.error(paymentCreateErrorMessage, { position: 'top-center' })
    }
  }, [dispatch, isPaymentCreateError])

  useEffect(() => {
    return () => {
      dispatch(resetServiceDetails())
      dispatch(resetBookingDetails())
      dispatch(resetBookingCreate())
      dispatch(resetBookingUpdate())
      dispatch(resetBookingDelete())
      dispatch(resetPaymentCreate())
    }
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()

    const bookingData = {
      user: userInfo._id,
      service: transport._id,
      customerInfo: {
        customerName,
        customerPhone,
        remarks,
        alert,
      },
    }

    dispatch(createBooking(bookingData))
  }

  const handleConfirm = () => {
    const bookingData = {
      paymentMethod,
    }
    updateBooking({ id: booking._id, bookingData })
    window.open(
      `http://localhost:5000/api/bookings/ssl-request?bookingId=${booking._id}&paymentMethod=cash`,
      '_self'
    )
    handleClose()
  }

  const handleCancel = () => {
    dispatch(deleteBooking(booking._id))
    toast.error('Booking Cancelled', { position: 'top-center' })
    handleClose()
  }

  const handlePayment = () => {
    const bookingData = {
      paymentMethod,
    }
    updateBooking({ id: booking._id, bookingData })
    window.open(
      `http://localhost:5000/api/bookings/ssl-request?bookingId=${booking._id}&paymentMethod=card`,
      '_self'
    )
    handleClose()
  }

  return (
    <>
      {isTransportDetailsLoading ||
      isBookingCreateLoading ||
      isBookingDeleteLoading ? (
        <Loader />
      ) : isTransportDetailsError ? (
        <Message variant='danger'>{transportDetailsErrorMessage}</Message>
      ) : (
        transport && (
          <Container Container className='pt-4'>
            {/* Header Card */}
            <Card className='mb-2 shadow'>
              <Card.Body>
                <Row>
                  <h3 className='text-center'>
                    Booking for {transport.serviceName}
                  </h3>
                </Row>
              </Card.Body>
            </Card>

            {/* Booking Card */}

            <Row className='mt-4'>
              {/* Left Column For Personal Information */}
              <Col lg={8} md={6} sm={12}>
                <Form onSubmit={submitHandler}>
                  <Card className='shadow'>
                    <Card.Header as='h5' className='my-2'>
                      Customer Information
                    </Card.Header>
                    <Card.Text className='small mx-3 mt-2'>
                      Booking Requested By :{' '}
                      {userInfo ? userInfo.userName : 'Guest'}
                    </Card.Text>
                    <Card.Text className='small mx-3 mt-2'>
                      * Please enter the contact details of the person who would
                      like to receive the confirmation and be contacted if
                      required.
                    </Card.Text>
                    <Card.Body>
                      <Row>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className='mb-3' controlId='bookingName'>
                            <Form.Label className=''>Customer Name</Form.Label>
                            <Form.Control
                              required
                              type='text'
                              className='shadow'
                              placeholder='Please Enter Your Name'
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                            />
                          </Form.Group>
                        </Col>

                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className='mb-3' controlId='guestCounts'>
                            <Form.Label className=''>Guest Counts</Form.Label>
                            <Form.Control
                              required
                              type='text'
                              className='shadow'
                              placeholder='Please Enter Number of Guest(s)'
                              value={guestCount}
                              onChange={(e) => setGuestCount(e.target.value)}
                            />
                          </Form.Group>
                        </Col>

                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className='mb-3' controlId='bookingName'>
                            <Form.Label className=''>Phone Number</Form.Label>
                            <Form.Control
                              required
                              type='text'
                              className='shadow'
                              placeholder='Please Enter Your Contact Number'
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                            />
                          </Form.Group>
                        </Col>

                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className='mb-3' controlId='bookingName'>
                            <Form.Label className=''>Remarks</Form.Label>
                            <Form.Control
                              as='textarea'
                              rows={3}
                              className='shadow'
                              placeholder='Please write if you have any remarks regarding your booking'
                              value={remarks}
                              onChange={(e) => setRemarks(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className='my-3 py-2'>
                        <Form.Group>
                          <Form.Check
                            type='checkbox'
                            label='Receive text alerts about this trip. Message and data rates may apply'
                            checked={alert}
                            onChange={(e) => setAlert(e.target.checked)}
                          />
                        </Form.Group>
                      </Row>

                      <Row className='py-3'>
                        <Button type='submit'>Confirm Booking</Button>
                      </Row>
                    </Card.Body>
                  </Card>
                </Form>
              </Col>

              {!isBookingCreateLoading && (
                <Modal
                  show={showBookingModal}
                  onHide={handleClose}
                  backdrop='static'
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Booking Information for {transport.serviceName}
                    </Modal.Title>
                  </Modal.Header>
                  {isBookingCreateLoading ? (
                    <Loader />
                  ) : isBookingCreateError ? (
                    <Message variant='danger'>
                      {bookingCreateErrorMessage}
                    </Message>
                  ) : (
                    <Modal.Body>
                      <Row>
                        <Col lg={12} md={12} sm={12}>
                          <Card.Title className=''>
                            {transport.transportInfo.carModel},{' '}
                            {transport.transportInfo.carType}
                          </Card.Title>
                          <Card.Text className='small'>
                            <MdLocationOn />{' '}
                            {transport.transportInfo.pickupFrom} to{' '}
                            {transport.transportInfo.dropTo} on <MdDateRange />{' '}
                            {Moment(transport.transportInfo.pickUpDate).format(
                              'DD-MM-YYYY'
                            )}{' '}
                            to <MdDateRange />{' '}
                            {Moment(transport.transportInfo.dropOffDate).format(
                              'DD-MM-YYYY'
                            )}
                          </Card.Text>
                          <Card.Text className='small'>
                            Customer Name: {customerName}
                            <br />
                            Customer Phone: {customerPhone}
                            <br />
                            Guest Count: {guestCount}
                            <br />
                            Remarks: {remarks}
                            <br />
                          </Card.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12} md={12} sm={12}>
                          <Form>
                            <Form.Group
                              className='mb-3'
                              controlId='paymentMethod'
                            >
                              <Form.Label className=''>
                                Payment Method
                              </Form.Label>
                              <Form.Control
                                as='select'
                                className='shadow'
                                value={paymentMethod}
                                onChange={(e) =>
                                  setPaymentMethod(e.target.value)
                                }
                              >
                                <option value=''>Select Payment Method</option>
                                <option value='cash'>Cash</option>
                                <option value='card'>
                                  Card/Mobile Banking
                                </option>
                              </Form.Control>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                    </Modal.Body>
                  )}
                  <Modal.Footer>
                    {paymentMethod === 'cash' && (
                      <Button variant='success' onClick={handleConfirm}>
                        Make Partial Payment and Confirm
                      </Button>
                    )}
                    {paymentMethod === 'card' && (
                      <Button variant='primary' onClick={handlePayment}>
                        Make Full Payment and Confirm
                      </Button>
                    )}
                    <Button variant='danger' onClick={handleCancel}>
                      Cancel Booking
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}

              {/* Right Column For Booking Information */}
              <Col lg={4} md={6} sm={12}>
                <Card className='shadow'>
                  <Card.Body>
                    {/* Image and Hotel Row */}
                    <Row className='mb-5'>
                      <Col lg={4} md={12} sm={12}>
                        <Card.Img
                          // src="/uploads/stays-1.jpg"
                          src={transport.coverImg}
                          className='img-fluid'
                        />
                      </Col>

                      <Col lg={8} md={12} sm={12}>
                        <Card.Title className=''>
                          {transport.transportInfo.carModel}
                        </Card.Title>
                        <Card.Text className='small'>
                          <MdLocationOn /> {transport.transportInfo.pickUpFrom}{' '}
                          - {transport.transportInfo.dropTo}
                        </Card.Text>
                      </Col>
                    </Row>

                    {/* Booking Information Row */}
                    <Row className='mb-5'>
                      <Col sm={12} md={8} lg={8}>
                        <Card.Title as='h5'>Booking Summary</Card.Title>
                      </Col>

                      {/* <Col sm={12} md={4} lg={4}>
                        <Card.Text className="d-flex justify-content-end small">
                          <strong>1 Night</strong>
                        </Card.Text>
                      </Col> */}

                      <Col lg={6} md={6} sm={6}>
                        <Row>
                          <Card.Text>
                            <strong>Car Model</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Depart From</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Departure Date</strong>
                          </Card.Text>
                          {/* <Card.Text>
                            <strong>Departure Time</strong>
                          </Card.Text> */}
                          <Card.Text>
                            <strong>Destination</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Drop Date</strong>
                          </Card.Text>
                          {/* <Card.Text>
                            <strong>Estimated Drop Time</strong>
                          </Card.Text> */}
                          <Card.Text>
                            <strong>Type</strong>
                          </Card.Text>
                        </Row>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <Row>
                          <Card.Text className='d-flex justify-content-end'>
                            {transport.transportInfo.carModel}
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            {transport.transportInfo.pickUpFrom}
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            {Moment(transport.transportInfo.pickUpDate).format(
                              'DD-MM-YYYY'
                            )}
                          </Card.Text>
                          {/* <Card.Text className='d-flex justify-content-end'>
                            {transport.transportInfo.pickUpTime.split(':')[0] *
                              1 >=
                              12 &&
                            transport.transportInfo.pickUpTime.split(':')[1] *
                              1 >=
                              0
                              ? ((transport.transportInfo.pickUpTime.split(
                                  ':'
                                )[0] *
                                  1) %
                                  12 || 12) +
                                ':' +
                                transport.transportInfo.pickUpTime.split(
                                  ':'
                                )[1] +
                                ' PM'
                              : transport.transportInfo.pickUpTime + ' AM'}
                          </Card.Text> */}
                          <Card.Text className='d-flex justify-content-end'>
                            {transport.transportInfo.dropTo}
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            {Moment(transport.transportInfo.dropOffDate).format(
                              'DD-MM-YYYY'
                            )}
                          </Card.Text>
                          {/* <Card.Text className='d-flex justify-content-end'>
                            {transport.transportInfo.dropOffTime.split(':')[0] *
                              1 >=
                              12 &&
                            transport.transportInfo.dropOffTime.split(':')[1] *
                              1 >=
                              0
                              ? ((transport.transportInfo.dropOffTime.split(
                                  ':'
                                )[0] *
                                  1) %
                                  12 || 12) +
                                ':' +
                                transport.transportInfo.dropOffTime.split(
                                  ':'
                                )[1] +
                                ' PM'
                              : transport.transportInfo.dropOffTime + ' AM'}
                          </Card.Text> */}
                          <Card.Text className='d-flex justify-content-end'>
                            {transport.transportInfo.carType}
                          </Card.Text>
                        </Row>
                      </Col>
                    </Row>

                    {/* Total Price Row */}
                    <Row>
                      <Card.Title as='h5' className='mb-3'>
                        Fare Summary
                      </Card.Title>

                      <Col lg={6} md={6} sm={6}>
                        <Row>
                          <Card.Text>
                            <strong>Route Fare</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Discount</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Price To Be Paid</strong>
                          </Card.Text>
                        </Row>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <Row>
                          <Card.Text className='d-flex justify-content-end'>
                            {transport.price}{' '}
                            <TbCurrencyTaka className='mt-1' />
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            {transport.priceDiscount}
                            {'%'}
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            {transport.price}{' '}
                            <TbCurrencyTaka className='mt-1' />
                          </Card.Text>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )
      )}
    </>
  )
}

export default TransportBookingScreen
