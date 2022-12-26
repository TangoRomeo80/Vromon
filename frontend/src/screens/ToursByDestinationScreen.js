import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Container,
  Card,
  Form,
  Button,
  Image,
  Modal,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { MdDateRange, MdLocationOn } from 'react-icons/md'
import { FaFilter } from 'react-icons/fa'
import { TbCurrencyTaka } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'moment'
import { getAllTours, resetServiceList } from '../features/service/serviceSlice'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import Rating from '../components/Rating'

const ToursByDestinationScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const [allTours, setAllTours] = useState([])
  const [maxPrice, setMaxPrice] = useState(5000)
  const [duration, setDuration] = useState(3)
  const [travelerCount, setTravelerCount] = useState(1)
  const [modifySearch, setModifySearch] = useState(false)
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 ? true : false
  )
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { tours, isListSuccess, isListError, isListLoading, listErrorMessage } =
    useSelector((state) => state.service)

  useEffect(() => {
    // if (!isListSuccess) {
    //   dispatch(getAllServices());
    // }
    if (isListError) {
      toast.error(listErrorMessage, { position: 'top-center' })
    } else if (isListSuccess) {
      const filteredServices = tours
        .filter((service) => {
          return service.destination._id === params.id
        })
        .filter((service) => {
          if (travelerCount === 0) {
            return service
          } else if (service.tourInfo.maxGroupSize >= travelerCount) {
            return service
          }
        })
        .filter((service) => {
          if (maxPrice === 5000) {
            return service
          } else if (service.price <= maxPrice) {
            return service
          }
        })
        .filter((service) => {
          if (duration === 0) {
            return service
          } else if (service.tourInfo.duration <= duration) {
            return service
          }
        })

      setAllTours(filteredServices)
    } else {
      dispatch(getAllTours())
    }
  }, [
    tours,

    travelerCount,

    isListSuccess,
    isListError,
    listErrorMessage,
    maxPrice,
    duration,
    dispatch,
  ])

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    })
  }, [])

  useEffect(() => {
    return () => {
      dispatch(resetServiceList())
    }
  }, [dispatch])

  return (
    <Container>
      <Row className='mb-2 pt-3'>
        <Col lg={8} md={8} sm={6}>
          <Card.Text as='h3'>
            Get tours for {allTours.length > 0 && allTours[0].destination.name}
          </Card.Text>
        </Col>
      </Row>

      {/* Search Results List */}
      <Row>
        {/* Left Colomn */}
        <Col sm={12} md={3} lg={3}>
          {isMobile ? (
            <>
              <Button
                className='ms-1 mb-2'
                style={{ backgroundColor: 'green' }}
                onClick={handleShow}
              >
                <FaFilter className='me-1' />
                Filters
              </Button>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Filters for Tours</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className='mb-3' controlId='busType'>
                      <Form.Label>Number of Travellers</Form.Label>
                      <Form.Control
                        type='text'
                        className='shadow'
                        placeholder='Enter Number of Travellers'
                        value={travelerCount}
                        onChange={(e) => setTravelerCount(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='busType'>
                      <Form.Label>Tour Duration (in days)</Form.Label>
                      <Form.Control
                        type='text'
                        className='shadow'
                        placeholder='Enter Tour Duration'
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='priceRange'>
                      <Form.Label>
                        Maximum Price Range: BDT{maxPrice}
                      </Form.Label>
                      <Form.Range
                        min={0}
                        max={10000}
                        step={100}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant='secondary' onClick={handleClose}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            <>
              <Card className='shadow'>
                <Card.Body>
                  <Card.Title as='h5'>Filters for Tours</Card.Title>
                  <Form>
                    <Form.Group className='mb-3' controlId='busType'>
                      <Form.Label>Number of Travellers</Form.Label>
                      <Form.Control
                        type='text'
                        className='shadow'
                        placeholder='Enter Number of Travellers'
                        value={travelerCount}
                        onChange={(e) => setTravelerCount(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='busType'>
                      <Form.Label>Tour Duration (in days)</Form.Label>
                      <Form.Control
                        type='text'
                        className='shadow'
                        placeholder='Enter Tour Duration'
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='priceRange'>
                      <Form.Label>
                        Maximum Price Range: BDT{maxPrice}
                      </Form.Label>
                      <Form.Range
                        min={0}
                        max={10000}
                        step={100}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </>
          )}
        </Col>

        {/* Right Colomn/Package Images Card */}
        <Col sm={12} md={9} lg={9}>
          <Card className='shadow'>
            <Card.Body>
              <Card.Title as='h5'>Explore Best Tour Packages</Card.Title>
              <Card.Text>*Get The Best Package Deals With Vromon</Card.Text>

              {isListLoading ? (
                <Loader />
              ) : allTours.length <= 0 ? (
                <Message variant='danger'>
                  No Tour Packages Found. Try To Modify Search Queries With
                  Different Package.
                </Message>
              ) : (
                <>
                  {allTours.map((tour) => (
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
                              BDT{' '}
                              {tour.price -
                                (tour.price * tour.priceDiscount) / 100}
                              <TbCurrencyTaka className='mb-1' />
                            </Card.Text>
                            <Card.Text>
                              <strong>
                                {tour.priceDiscount > 0
                                  ? tour.priceDiscount + '% off'
                                  : 'No discount available'}
                              </strong>
                            </Card.Text>
                            <Link
                              to={`/toursBooking/${tour._id}`}
                              className='btn btn-success me-2'
                            >
                              Book Now
                            </Link>
                            <Link
                              to={`/tourDetailsTourist/${tour._id}`}
                              className='btn btn-warning'
                            >
                              View Details
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
        </Col>
      </Row>
    </Container>
  )
}

export default ToursByDestinationScreen
