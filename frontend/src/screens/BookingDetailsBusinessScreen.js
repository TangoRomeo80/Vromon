import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useParams } from 'react-router-dom'
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

const BookingDetailsBusinessScreen = () => {
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

  useEffect(() => {
    if (isUpdateError) {
      toast.error(updateErrorMessage, { position: 'top-center' })
    } else if (isUpdateSuccess) {
      if (booking.bookingStatus === 'availed') {
        toast.success('Booking confirmed for customer', {
          position: 'top-center',
        })
      } else if (booking.bookingStatus === 'cancelled') {
        toast.error('Booking cancelled for customer', {
          position: 'top-center',
        })
      }
    }
  })

  useEffect(() => {
    return () => {
      dispatch(resetBookingDetails())
      dispatch(resetBookingUpdate())
    }
  }, [dispatch])

  const confirmBookingHandler = () => {
    const bookingData = {
      bookingStatus: 'availed',
      availedDate: Date.now(),
    }

    dispatch(
      updateBooking({
        id: params.id,
        bookingData,
      })
    )
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
              <Col xs={12} md={4} xl={3}>
                <Card className='mb-4'>
                  <Card.Header>Requested Service Image</Card.Header>
                  <Card.Body className='text-center'>
                    <Form.Group controlId='image 1'>
                      <Form.Label>Upload New Image</Form.Label>
                      <Form.Control
                        className='mb-3'
                        type='file'
                        id='image-file'
                        label='Cover Image'
                      ></Form.Control>
                    </Form.Group>
                  </Card.Body>
                </Card>
                <Card className='mb-4'>
                  <Card.Header>NID Scan Copy</Card.Header>
                  <Card.Body className='text-center'>
                    <Form.Group controlId='image 2'>
                      <Form.Label>Upload New Image</Form.Label>
                      <Form.Control
                        className='mb-3'
                        type='file'
                        id='image-file'
                        label='Cover Image'
                      ></Form.Control>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={8} xl={9}>
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
                            type='date'
                            disabled
                            value={bookingDate}
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
                            type='date'
                            disabled
                            value={availedDate}
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
                      <Col lg={6} md={6} sm={12}>
                        <Button
                          className='d-flex justify-content-start'
                          variant='outline-success'
                          onClick={confirmBookingHandler}
                        >
                          Confirm Booking
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
                          onClick={cancelBookingHandler}
                        >
                          Cancel Booking
                        </Button>
                      </Col>
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
