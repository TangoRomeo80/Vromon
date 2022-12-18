import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { TbCurrencyTaka } from 'react-icons/tb'
import { MdLocationOn } from 'react-icons/md'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllTransports,
  getAllAccomodations,
  getAllTours,
  resetServiceList,
} from '../features/service/serviceSlice'
import Rating from '../components/Rating'
import Moment from 'moment'
import { LinkContainer } from 'react-router-bootstrap'

const ServiceListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    transports,
    accomodations,
    tours,
    isListLoading,
    isListSuccess,
    isListError,
    listErrorMessage,
  } = useSelector((state) => state.service)

  const [serviceType, setServiceType] = useState('transportation')
  const [ownedTransports, setOwnedTransports] = useState([])
  const [ownedAccomodations, setOwnedAccomodations] = useState([])
  const [ownedTours, setOwnedTours] = useState([])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'businessowner') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (isListError) {
      toast.error(listErrorMessage, { position: 'top-center' })
    } else if (isListSuccess) {
      setOwnedTransports(
        transports.filter(
          (transport) => transport.business.businessOwner._id === userInfo._id
        )
      )
      setOwnedAccomodations(
        accomodations.filter(
          (accomodation) =>
            accomodation.business.businessOwner._id === userInfo._id
        )
      )
      setOwnedTours(
        tours.filter((tour) => tour.business.businessOwner._id === userInfo._id)
      )
    } else {
      dispatch(getAllTransports())
      dispatch(getAllAccomodations())
      dispatch(getAllTours())
    }
  }, [
    isListError,
    isListSuccess,
    listErrorMessage,
    transports,
    accomodations,
    tours,
    userInfo,
    dispatch,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetServiceList())
    }
  }, [dispatch])

  return (
    <Container className='pt-5'>
      <Form>
        <Row>
          {/* Left Column For Options */}
          <Col lg={3} md={12} sm={12}>
            <Card className='mb-1 shadow'>
              <Card.Body>
                <Row
                  className='my-2'
                  onClick={() => setServiceType('transportation')}
                >
                  <Button>Transports</Button>
                </Row>
                <Row
                  className='my-2'
                  onClick={() => setServiceType('accomodation')}
                >
                  <Button>Stays</Button>
                </Row>
                <Row className='my-2' onClick={() => setServiceType('tours')}>
                  <Button>Tours</Button>
                </Row>
              </Card.Body>
            </Card>
            <Card className='mb-1 shadow'>
              <Card.Body>
                <Row>
                  <LinkContainer to='/serviceCreate'>
                    <Button variant='success'>Create New Service</Button>
                  </LinkContainer>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column For Business List */}

          <Col lg={9} md={12} sm={12}>
            {isListLoading ? (
              <Loader />
            ) : isListError ? (
              <Message variant='danger'>{listErrorMessage}</Message>
            ) : (
              <Card className='mb-1 shadow'>
                <Card.Body>
                  {serviceType === 'transportation' ? (
                    <>
                      <Card.Title as='h5'>Transport Services</Card.Title>
                      {ownedTransports.map((transport) => (
                        <Card className='my-2 shadow' key={transport._id}>
                          <Card.Body>
                            <Row>
                              <Col lg={3} md={3} sm={12}>
                                <Image
                                  src={transport.coverImg}
                                  alt={transport.serviceName}
                                  fluid
                                />
                              </Col>
                              <Col lg={5} md={5} sm={12}>
                                <Card.Title as='h5'>
                                  {transport.serviceName}
                                </Card.Title>
                                <Card.Text>
                                  <strong>Car Type: </strong>
                                  {transport.transportInfo.carType}
                                </Card.Text>
                                <Card.Text>
                                  <strong>Car Model: </strong>
                                  {transport.transportInfo.carModel}
                                </Card.Text>
                                <Card.Text>
                                  <strong>Pick from: </strong>
                                  {transport.transportInfo.pickUpFrom}
                                </Card.Text>
                                <Card.Text>
                                  <strong>Drop to: </strong>
                                  {transport.transportInfo.dropTo}
                                </Card.Text>
                                <Card.Text>
                                  <Rating
                                    value={transport.rating}
                                    text={`${transport.numOfRatings} reviews`}
                                    num={transport.numOfRatings}
                                  />
                                </Card.Text>
                              </Col>
                              <Col lg={4} md={4} sm={12}>
                                <Card.Text>
                                  <strong>Pick Date: </strong>
                                  {Moment(
                                    transport.transportInfo.pickUpDate
                                  ).format('DD-MM-YYYY')}
                                </Card.Text>
                                <Card.Text>
                                  <strong>Drop Date: </strong>
                                  {Moment(
                                    transport.transportInfo.dropOffDate
                                  ).format('DD-MM-YYYY')}
                                </Card.Text>
                                <Card.Text>
                                  <strong>Pick time: </strong>
                                  {transport.transportInfo.pickUpTime.split(
                                    ':'
                                  )[0] *
                                    1 >=
                                    12 &&
                                  transport.transportInfo.pickUpTime.split(
                                    ':'
                                  )[1] *
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
                                    : transport.transportInfo.pickUpTime +
                                      ' AM'}
                                </Card.Text>
                                <Card.Text>
                                  <strong>Drop time: </strong>
                                  {transport.transportInfo.dropOffTime.split(
                                    ':'
                                  )[0] *
                                    1 >=
                                    12 &&
                                  transport.transportInfo.dropOffTime.split(
                                    ':'
                                  )[1] *
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
                                    : transport.transportInfo.dropOffTime +
                                      ' AM'}
                                </Card.Text>
                                <Card.Text style={{ color: 'red' }}>
                                  <strong>Price: </strong>
                                  BDT {transport.price} <TbCurrencyTaka />
                                </Card.Text>
                                <Link
                                  to={`/transportDetailsBusiness/${transport._id}`}
                                  className='btn btn-warning'
                                >
                                  See details
                                </Link>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))}
                    </>
                  ) : serviceType === 'accomodation' ? (
                    <>
                      <Card.Title as='h5'>Accomodation Services</Card.Title>
                      {ownedAccomodations.map((accomodation) => (
                        <Card className='my-2 shadow' key={accomodation._id}>
                          <Row className='d-flex'>
                            <Col sm={4} md={3} lg={3}>
                              <Card.Img
                                src={accomodation.coverImg}
                                className='img-fluid rounded-start'
                                variant='top'
                                style={{ objectFit: 'cover', height: '100%' }}
                              />
                            </Col>
                            <Col sm={4} md={6} lg={6}>
                              <Card.Body>
                                <Card.Title as='h5'>
                                  {accomodation.serviceName}
                                </Card.Title>
                                <Card.Text>
                                  <MdLocationOn /> &nbsp;
                                  {`${accomodation.accomodationInfo.address.house}, ${accomodation.accomodationInfo.address.street}, ${accomodation.accomodationInfo.address.area}, ${accomodation.accomodationInfo.address.city}, `}
                                  Bangladesh
                                </Card.Text>
                                <Card.Text>
                                  <strong>Rooms Available : </strong>
                                  {accomodation.accomodationInfo.rooms}
                                </Card.Text>
                                <Card.Text>
                                  <strong>Max Guests : </strong>
                                  {accomodation.accomodationInfo.maxGuests}
                                </Card.Text>
                                <Card.Text>
                                  <Rating
                                    value={accomodation.rating}
                                    text={`${accomodation.numOfRatings} reviews`}
                                    num={accomodation.numOfRatings}
                                  />
                                </Card.Text>
                              </Card.Body>
                            </Col>

                            <Col
                              sm={4}
                              md={3}
                              lg={3}
                              className='d-flex justify-content-end'
                            >
                              <Card.Body>
                                <Card.Text className='my-3'>
                                  <strong>Cost : </strong> BDT{' '}
                                  {accomodation.price}
                                  <TbCurrencyTaka className='mb-1' />
                                </Card.Text>
                                <Card.Text>
                                  <strong>
                                    **Discount Price Here (If Available)
                                  </strong>
                                </Card.Text>

                                <Link
                                  to={`/staysDetailsBusiness/${accomodation._id}`}
                                  className='btn btn-warning'
                                >
                                  See details
                                </Link>
                              </Card.Body>
                            </Col>
                          </Row>
                        </Card>
                      ))}
                    </>
                  ) : (
                    <>
                      <Card.Title as='h5'>Tour Services</Card.Title>
                      {ownedTours.map((tour) => (
                        <Card className='shadow my-2'>
                          <Row>
                            <Col lg={3} md={3} sm={12}>
                              <Card.Img
                                className='img-fluid rounded-start'
                                src={tour.coverImg}
                                alt={tour.serviceName}
                                style={{ objectFit: 'cover', height: '100%' }}
                              />
                            </Col>
                            <Col lg={5} md={5} sm={12}>
                              <Card.Body>
                                <Card.Title as='h5'>
                                  {tour.tourInfo.name}
                                </Card.Title>
                                <Card.Text>
                                  <MdLocationOn /> &nbsp;
                                  <strong>District: </strong>
                                  {tour.destination.district}
                                </Card.Text>
                                <Card.Text>
                                  <strong>Max Travelers Count : </strong>
                                  {tour.tourInfo.maxGroupSize}
                                </Card.Text>
                                <Card.Text>
                                  <Rating
                                    value={tour.rating}
                                    text={`${tour.numOfRatings} reviews`}
                                    num={tour.numOfRatings}
                                  />
                                </Card.Text>
                              </Card.Body>
                            </Col>
                            <Col lg={4} md={4} sm={12}>
                              <Card.Body>
                                <Card.Text>
                                  <strong>Travel Date : </strong>
                                  {Moment(tour.tourInfo.travelDate).format(
                                    'DD-MM-YYYY'
                                  )}
                                </Card.Text>
                                <Card.Text>
                                  <strong>Lead Tour Guide : </strong>
                                  {tour.tourInfo.leadGuideName}
                                </Card.Text>
                                <Card.Text style={{ color: 'red' }}>
                                  <strong>Price : </strong>
                                  BDT {tour.price}
                                  <TbCurrencyTaka className='mb-1' />
                                </Card.Text>

                                <Link
                                  to={`/tourDetailsBusiness/${tour._id}`}
                                  className='btn btn-warning'
                                >
                                  See details
                                </Link>
                              </Card.Body>
                            </Col>
                          </Row>
                        </Card>
                      ))}
                    </>
                  )}
                </Card.Body>
              </Card>
            )}

            {/* <Card className='mb-1 shadow'>
              <Card.Body>
                <Row className='my-2 pb-2'>
                  <Col sm={4} md={3} lg={3}>
                    <Card.Img
                      src='/Destinations/Test.jpg'
                      className='img-fluid rounded-start'
                      variant='top'
                      style={{ objectFit: 'cover', height: '220px' }}
                    />
                  </Col>
                  <Col sm={4} md={6} lg={6}>
                    <Card.Body>
                      <Card.Title as='h5'>Sayeman Hotel & Resort</Card.Title>
                      <Card.Text>
                        <MdLocationOn /> &nbsp;14 Kalatoli Hotel Motel Zone,
                        Cox's Bazar, Bangladesh
                      </Card.Text>
                      <Card.Text>*Rating Here</Card.Text>
                      <Card.Text>*Trip Coin</Card.Text>
                    </Card.Body>
                  </Col>
                  <Col
                    sm={4}
                    md={3}
                    lg={3}
                    className='d-flex justify-content-end'
                  >
                    <Card.Body>
                      <Card.Text className='my-3'>Starts From</Card.Text>
                      <Card.Text>BDT Magna/Night</Card.Text>

                      <Button className='mt-4'>Book Now</Button>
                    </Card.Body>
                  </Col>
                </Row>

                <Row className='my-2 pb-2'>
                  <Col sm={4} md={3} lg={3}>
                    <Card.Img
                      src='/Destinations/Test.jpg'
                      className='img-fluid rounded-start'
                      variant='top'
                      style={{ objectFit: 'cover', height: '220px' }}
                    />
                  </Col>
                  <Col sm={4} md={6} lg={6}>
                    <Card.Body>
                      <Card.Title as='h5'>Sayeman Hotel & Resort</Card.Title>
                      <Card.Text>
                        <MdLocationOn /> &nbsp;14 Kalatoli Hotel Motel Zone,
                        Cox's Bazar, Bangladesh
                      </Card.Text>
                      <Card.Text>*Rating Here</Card.Text>
                      <Card.Text>*Trip Coin</Card.Text>
                    </Card.Body>
                  </Col>
                  <Col
                    sm={4}
                    md={3}
                    lg={3}
                    className='d-flex justify-content-end'
                  >
                    <Card.Body>
                      <Card.Text className='my-3'>Starts From</Card.Text>
                      <Card.Text>BDT Magna/Night</Card.Text>

                      <Button className='mt-4'>Book Now</Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card.Body>
            </Card> */}
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default ServiceListScreen
