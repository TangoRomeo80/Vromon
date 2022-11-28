import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Row, Col, Container, Card, Button } from 'react-bootstrap'
import { FaCar, FaUmbrellaBeach } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { BiHotel } from 'react-icons/bi'
import ListGroup from 'react-bootstrap/ListGroup'
import Carousel from 'react-bootstrap/Carousel'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDestinationById,
  resetDestinationDetails,
} from '../features/destination/destinationSlice'
import Rating from '../components/Rating'
import AddReview from '../components/AddReview'
import ReadReviews from '../components/ReadReviews'

const DestinationDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const [destinationDetails, setDestinationDetails] = useState()

  const {
    destination,
    isDetailsLoading,
    isDetailsError,
    isDetailsSuccess,
    detailsErrorMessage,
  } = useSelector((state) => state.destination)

  const reFetchDestiantion = () => {
    dispatch(getDestinationById(params.id))
  }

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: 'top-center' })
    }
    if (isDetailsSuccess) {
      setDestinationDetails(destination)
    } else {
      dispatch(getDestinationById(params.id)) //id
    }
  }, [
    dispatch,
    destination,
    isDetailsSuccess,
    isDetailsError,
    detailsErrorMessage,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetDestinationDetails())
    }
  }, [dispatch])

  return (
    <>
      {isDetailsLoading ? (
        <Loader />
      ) : (
        destination && (
          <div>
            <Container className='py-3'>
              <Row className='my-2'>
                <h3 className='text-center'>Explore {destination.name}</h3>
              </Row>
              <Row className='my-2'>
                <Col md={12} sm={12} lg={12}>
                  <Card className='mb-2'>
                    <Card.Img
                      cascade
                      className='img-fluid'
                      src={destination.coverImg}
                      style={{ maxHeight: '40vh', objectFit: 'cover' }}
                    />
                    <Card.Body cascade>
                      <Card.Title>{destination.name}</Card.Title>
                      <Card.Text>
                        <MdLocationOn /> {destination.district},
                        {destination.division}
                      </Card.Text>
                      <Card.Text>
                        <Rating
                          value={destination.rating}
                          text={`${destination.numOfRatings} reviews`}
                          num={destination.numOfRatings}
                        />
                      </Card.Text>
                      <Card.Text>
                        <AddReview reset={reFetchDestiantion} id={params.id} />
                        <ReadReviews id={params.id} />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className='my-2'>
                <Col
                  md={12}
                  sm={12}
                  lg={12}
                  className='d-flex justify-content-center align-items-center'
                >
                  <Card className='mb-2 text-center w-100'>
                    <Card.Header as='h3' className='text-center'>
                      Services in {destination.name}
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={4} sm={4} lg={4}>
                          <Link
                            to={`/transportByDestination?destination=${params.id}`}
                          >
                            <Button variant='primary' className='w-100'>
                              <FaCar className='me-1' />
                              Transport
                            </Button>
                          </Link>
                        </Col>
                        <Col md={4} sm={4} lg={4}>
                          <Link
                            to={`/staysByDestination?destination=${params.id}`}
                          >
                            <Button variant='success' className='w-100'>
                              <BiHotel className='me-1' />
                              Stays
                            </Button>
                          </Link>
                        </Col>
                        <Col md={4} sm={4} lg={4}>
                          <Link
                            to={`/tourByDestination?destination=${params.id}`}
                          >
                            <Button variant='warning' className='w-100'>
                              <FaUmbrellaBeach className='me-1' />
                              Tours
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className='pt-3'>
                <Col lg={6} sm={12} md={6}>
                  <Carousel>
                    {destination.images.map((image, index) => (
                      <Carousel.Item>
                        <img
                          className='d-block w-100'
                          src={image}
                          alt={`Image-${index}`}
                          style={{ maxHeight: '40vh', objectFit: 'cover' }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Col>

                <Col lg={6} sm={12} md={6}>
                  <Card style={{ height: '40vh' }}>
                    <iframe
                      src={destination.mapEmbed}
                      width='100%'
                      height='100%'
                    ></iframe>
                  </Card>
                </Col>
              </Row>
              <Row className='pt-3'>
                <Card>
                  <Card.Header as='h3' className='text-center'>
                    About {destination.name}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{destination.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Row>
            </Container>
          </div>
        )
      )}
    </>
  )
}

export default DestinationDetails
