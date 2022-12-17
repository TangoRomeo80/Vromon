import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
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
                      {ownedTransports.map((transport) => (
                        <Row className='my-2 pb-2'>
                          <Col sm={4} md={3} lg={3}>
                            <Card.Img
                              src={transport.coverImg}
                              className='img-fluid rounded-start'
                              variant='top'
                              style={{ objectFit: 'cover', height: '220px' }}
                            />
                          </Col>
                        </Row>
                      ))}
                    </>
                  ) : serviceType === 'accomodation' ? (
                    <h1>Hello accomodation</h1>
                  ) : (
                    <h1>Hello tours</h1>
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
