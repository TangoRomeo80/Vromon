import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { MdLocationOn } from 'react-icons/md'
import { TbCurrencyTaka } from 'react-icons/tb'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getTransportById,
  resetServiceDetails,
} from '../features/service/serviceSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'

const TransportBookingScreen = () => {
  const trannsportId = useParams().id

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    transport,
    isDetailsLoading,
    isDetailsSuccess,
    isDetailsError,
    detailsErrorMessage,
  } = useSelector((state) => state.service)

  const [transportDetail, setTransportDetail] = useState({})

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: 'top-center' })
    } else if (isDetailsSuccess) {
      setTransportDetail(transport)
    } else {
      dispatch(getTransportById(trannsportId))
    }
  }, [dispatch, trannsportId])

  useEffect(() => {
    return () => {
      dispatch(resetServiceDetails())
    }
  }, [dispatch])

  return (
    <>
      {isDetailsLoading ? (
        <Loader />
      ) : isDetailsError ? (
        <Message variant='danger'>{detailsErrorMessage}</Message>
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
                <Form>
                  <Card className='shadow'>
                    <Card.Header as='h5' className='my-2'>
                      Customer Information
                    </Card.Header>
                    <Card.Text className='small mx-3 mt-2'>
                      Booking Completed by:{' '}
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
                            <Form.Label className=''>Booking Name</Form.Label>
                            <Form.Control
                              type='text'
                              className='shadow'
                              placeholder='Please Enter Your Name'
                            />
                          </Form.Group>
                        </Col>

                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className='mb-3' controlId='guestCounts'>
                            <Form.Label className=''>Guest Counts</Form.Label>
                            <Form.Control
                              type='text'
                              className='shadow'
                              placeholder='Please Enter Number of Guest(s)'
                            />
                          </Form.Group>
                        </Col>

                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className='mb-3' controlId='bookingName'>
                            <Form.Label className=''>Phone Number</Form.Label>
                            <Form.Control
                              type='text'
                              className='shadow'
                              placeholder='Please Enter Your Contact Number'
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
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className='my-3 py-2'>
                        <Form.Group>
                          <Form.Check
                            type='checkbox'
                            label='Receive text alerts about this trip. Message and data rates may apply'
                          />
                        </Form.Group>
                      </Row>

                      <Row className='py-3'>
                        <LinkContainer to='#'>
                          <Button>Confirm Booking</Button>
                        </LinkContainer>
                      </Row>
                    </Card.Body>
                  </Card>
                </Form>
              </Col>

              {/* Right Column For Booking Information */}
              <Col lg={4} md={6} sm={12}>
                <Card className='shadow'>
                  <Card.Body>
                    {/* Image and Hotel Row */}
                    <Row className='mb-5'>
                      <Col lg={4} md={12} sm={12}>
                        <Card.Img
                          src='/uploads/stays-1.jpg'
                          className='img-fluid'
                        />
                      </Col>

                      <Col lg={8} md={12} sm={12}>
                        <Card.Title className='small'>
                          Transport Name
                        </Card.Title>
                        <Card.Text className='small'>
                          <MdLocationOn /> Dhaka to Modonpur
                        </Card.Text>
                      </Col>
                    </Row>

                    {/* Booking Information Row */}
                    <Row className='mb-5'>
                      <Col sm={12} md={8} lg={8}>
                        <Card.Title as='h5'>Booking Summary</Card.Title>
                      </Col>

                      <Col sm={12} md={4} lg={4}>
                        <Card.Text className='d-flex justify-content-end small'>
                          <strong>1 Night</strong>
                        </Card.Text>
                      </Col>

                      <Col lg={6} md={6} sm={6}>
                        <Row>
                          <Card.Text>
                            <strong>Departure Date</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Departure Time</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Type</strong>
                          </Card.Text>
                        </Row>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <Row>
                          <Card.Text className='d-flex justify-content-end'>
                            12-14-2022
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            15:00 PM
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            Air Conditioned
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
                            BDT 5000 <TbCurrencyTaka className='mt-1' />
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            0%
                          </Card.Text>
                          <Card.Text className='d-flex justify-content-end'>
                            BDT 5000 <TbCurrencyTaka className='mt-1' />
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

// TransportBookingScreen
