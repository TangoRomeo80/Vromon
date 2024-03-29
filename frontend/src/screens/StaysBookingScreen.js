import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { MdLocationOn, MdDateRange } from 'react-icons/md'
import { TbCurrencyTaka } from 'react-icons/tb'
import Moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'
import {
  getAccomodationById,
  resetServiceDetails,
} from '../features/service/serviceSlice'
import {
  createBooking,
  updateBooking,
  deleteBooking,
  resetBookingCreate,
  resetBookingUpdate,
  resetBookingDetails,
  resetBookingDelete,
} from '../features/booking/bookingSlice'
import {
  createPayment,
  resetPaymentCreate,
} from '../features/payment/paymentSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { toast } from 'react-toastify'

const StaysBookingScreen = () => {
  const [searchParams] = useSearchParams()

  const accomodationId = useParams().id

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    accomodation,
    isDetailsLoading: isAccomodationDetailsLoading,
    isDetailsError: isAccomodationDetailsError,
    detailsErrorMessage: accomodationDetailsErrorMessage,
    isDetailsSuccess: isAccomodationDetailsSuccess,
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

  const [accomodationDetails, setAccomodationDetails] = useState({})
  const [customerName, setCustomerName] = useState('')
  // const [guestCount, setGuestCount] = useState(1);
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
          dispatch(
            createPayment({
              paymentParties: 'C2B',
              paymentMethod: 'card',
              paymentAmount: searchParams.get('amount') * 1,
              paymentFrom: userInfo._id,
              paymentForBooking: searchParams.get('bookingId'),
            })
          )
        } else if (searchParams.get('paymentMethod') === 'cash') {
          dispatch(
            updateBooking({
              id: searchParams.get('bookingId'),
              bookingData: {
                paymentStatus: 'partial',
                paymentAmount: searchParams.get('amount') * 1 * 0.3,
                paymentMethod: 'cash',
                bookingStatus: 'booked',
              },
            })
          )
          dispatch(
            createPayment({
              paymentParties: 'C2B',
              paymentMethod: 'card',
              paymentAmount: searchParams.get('amount') * 1 * 0.3,
              paymentFrom: userInfo._id,
              paymentForBooking: searchParams.get('bookingId'),
            })
          )
        }

        toast.success('Payment Successful, Booking Completed', {
          position: 'top-center',
        })
      } else if (searchParams.get('status') === 'fail') {
        dispatch(deleteBooking(searchParams.get('bookingId')))
        toast.error('Payment Failed, Booking Cancelled', {
          position: 'top-center',
        })
      } else if (searchParams.get('status') === 'cancel') {
        dispatch(deleteBooking(searchParams.get('bookingId')))
        toast.error('Payment Cancelled, Booking Cancelled', {
          position: 'top-center',
        })
      }
    }
  }, [])

  useEffect(() => {
    if (isAccomodationDetailsError) {
      toast.error(accomodationDetailsErrorMessage, {
        position: 'top-center',
      })
    } else if (isAccomodationDetailsSuccess) {
      setAccomodationDetails(accomodation)
    } else {
      dispatch(getAccomodationById(accomodationId))
    }
  }, [dispatch, accomodationId])

  useEffect(() => {
    if (isBookingCreateError) {
      toast.error(bookingCreateErrorMessage, {
        position: 'top-center',
      })
    } else if (isBookingUpdateError) {
      toast.error(bookingUpdateErrorMessage, {
        position: 'top-center',
      })
    } else if (isBookingDeleteError) {
      toast.error(bookingDeleteErrorMessage, {
        position: 'top-center',
      })
    } else if (isBookingCreateSuccess) {
      handleShow()
    }
  }, [dispatch, isBookingCreateSuccess, isBookingCreateError])

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
      service: accomodation._id,
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
      {isAccomodationDetailsLoading ||
      isBookingCreateLoading ||
      isBookingDeleteLoading ? (
        <Loader />
      ) : isAccomodationDetailsError ? (
        <Message variant='danger'>{accomodationDetailsErrorMessage}</Message>
      ) : (
        accomodation && (
          <Container className='pt-4'>
            {/* Header Card */}
            <Card className='mb-2 shadow'>
              <Card.Body>
                <Row>
                  <h3 className='text-center'>
                    {accomodation.serviceName} Booking Info
                  </h3>
                </Row>
              </Card.Body>
            </Card>

            <Row className='my-3 d-flex'>
              <Col lg={7} md={7} sm={12}>
                <Card>
                  <Card.Img
                    className='img-fluid'
                    cascade
                    src={accomodation.coverImg}
                    style={{ height: '53vh' }}
                  />
                </Card>
              </Col>

              <Col lg={5} md={5} sm={12}>
                <Row>
                  <Col lg={6} md={12} sm={12} className='mb-4'>
                    <Card>
                      <Card.Img
                        className='img-fluid'
                        cascade
                        src={accomodation.images[0]}
                        style={{ height: '25vh' }}
                      />
                    </Card>
                  </Col>
                  <Col lg={6} md={12} sm={12}>
                    <Card>
                      <Card.Img
                        className='img-fluid'
                        cascade
                        src={accomodation.images[1]}
                        style={{ height: '25vh' }}
                      />
                    </Card>
                  </Col>
                  <Col lg={6} md={12} sm={12}>
                    <Card>
                      <Card.Img
                        className='img-fluid'
                        cascade
                        src={accomodation.images[2]}
                        style={{ height: '25vh' }}
                      />
                    </Card>
                  </Col>
                  <Col lg={6} md={12} sm={12}>
                    <Card>
                      <Card.Img
                        className='img-fluid'
                        cascade
                        src={accomodation.images[0]}
                        style={{ height: '25vh' }}
                      />
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>

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
                          <Form.Group className='mb-3' controlId='customerName'>
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
                          <Form.Group className='mb-3' controlId='phone'>
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
                          <Form.Group className='mb-3' controlId='remarks'>
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

              {/* Payment Modal */}
              {!isBookingCreateLoading && (
                <Modal
                  show={showBookingModal}
                  onHide={handleClose}
                  backdrop='static'
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Booking Information For {accomodation.serviceName}
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
                            {accomodation.accomodationInfo.address.house},{' '}
                            {accomodation.accomodationInfo.rooms} {'Rooms'}
                          </Card.Title>
                          <Card.Text className='small'>
                            <MdLocationOn />{' '}
                            {accomodation.accomodationInfo.address.city}{' '}
                            <MdDateRange />{' '}
                            {Moment(
                              accomodation.accomodationInfo.checkinDate
                            ).format('DD MMM YYYY')}
                            to <MdDateRange />{' '}
                            {Moment(
                              accomodation.accomodationInfo.checkoutDate
                            ).format('DD MMM YYYY')}
                          </Card.Text>
                          <Card.Text className='small'>
                            Customer Name : {customerName}
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
                      <Row className='mt-3'>
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
                                <option value='cash'>
                                  Cash(30% needs to be paid)
                                </option>
                                <option value='card'>
                                  Card / Mobile Banking
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
                          src={accomodation.coverImg}
                          className='img-fluid'
                        />
                      </Col>

                      <Col lg={8} md={12} sm={12}>
                        <Card.Title className='small'>
                          {accomodation.accomodationInfo.address.house}
                        </Card.Title>
                        <Card.Text className='small'>
                          <MdLocationOn />
                          {`${accomodation.accomodationInfo.address.house}, ${accomodation.accomodationInfo.address.street}, ${accomodation.accomodationInfo.address.area}, ${accomodation.accomodationInfo.address.city}, `}
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
                            <strong>Check-In Date</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Check-Out Date</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Guest(s)</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Room(s)</strong>
                          </Card.Text>
                        </Row>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <Row>
                          <Card.Text className='d-flex justify-content-end'>
                            {Moment(
                              accomodation.accomodationInfo.checkinDate
                            ).format('DD MMM YYYY')}
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            {Moment(
                              accomodation.accomodationInfo.checkoutDate
                            ).format('DD MMM YYYY')}
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            {guestCount}
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            {accomodation.accomodationInfo.rooms}
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
                            <strong>Total Rate</strong>
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
                            BDT {accomodation.price}{' '}
                            <TbCurrencyTaka className='mt-1' />
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            {accomodation.priceDiscount}
                            {'%'}
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            BDT {accomodation.price}{' '}
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

export default StaysBookingScreen
