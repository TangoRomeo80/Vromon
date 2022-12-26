import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Row,
  Col,
  Container,
  Card,
  Form,
  Button,
  Modal,
  Image,
} from 'react-bootstrap'
import { FaFilter } from 'react-icons/fa'
import { TbCurrencyTaka } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllTransports,
  resetServiceList,
} from '../features/service/serviceSlice'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Rating from '../components/Rating'
import { toast } from 'react-toastify'
import Moment from 'moment'

const TransportByDestinationScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const [allTransports, setAllTransports] = useState([])
  const [maxPrice, setMaxPrice] = useState(5000)
  const [carType, setCarType] = useState('')
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 ? true : false
  )
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const {
    transports,
    isListLoading,
    isListSuccess,
    isListError,
    listErrorMessage,
  } = useSelector((state) => state.service)

  useEffect(() => {
    if (isListError) {
      toast.error(listErrorMessage, { position: 'top-center' })
    } else if (isListSuccess) {
      const filteredServices = transports
        .filter((service) => {
          return service.transportInfo.transportType === 'car'
        })
        .filter((service) => {
          return service.destination._id === params.id
        })
        .filter((service) => {
          if (carType === '') {
            return service
          } else if (service.transportInfo.carType === carType) {
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

      setAllTransports(filteredServices)
    } else {
      dispatch(getAllTransports())
    }
  }, [
    dispatch,
    transports,
    isListSuccess,
    isListError,
    listErrorMessage,
    maxPrice,
    carType,
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
    <>
      <div>
        <Container className='mb-3'>
          <Row className='mb-4 pt-3'>
            <Col
              lg={8}
              md={8}
              sm={12}
              // className='d-flex justify-content-center'
            >
              <Card.Text as='h3'>Transport List</Card.Text>
              <Card.Text>
                Transport Services for{' '}
                {allTransports.length > 0 && allTransports[0].destination.name}
              </Card.Text>
            </Col>
          </Row>

          <Row className='pt-3'>
            <>
              <Col lg={3} md={3} sm={12}>
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
                        <Modal.Title>Filters for Car Rental</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className='mb-3' controlId='busType'>
                            <Form.Label>Car Type</Form.Label>
                            <Form.Select
                              aria-label='Default select example'
                              onChange={(e) => setCarType(e.target.value)}
                            >
                              <option value=''>All</option>
                              <option value='4 seater'>4 Seater</option>
                              <option value='6 seater'>6 Seater</option>
                              <option value='8 seater'>8 Seater</option>
                            </Form.Select>
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
                        <Card.Title as='h5'>Filters for Car Rentals</Card.Title>
                        <Form>
                          <Form.Group className='mb-3' controlId='busType'>
                            <Form.Label>Car Type</Form.Label>
                            <Form.Select
                              aria-label='Default select example'
                              onChange={(e) => setCarType(e.target.value)}
                            >
                              <option value=''>All</option>
                              <option value='4 seater'>4 Seater</option>
                              <option value='6 seater'>6 Seater</option>
                              <option value='8 seater'>8 Seater</option>
                            </Form.Select>
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
              <Col lg={9} md={9} sm={12}>
                <Card className='shadow'>
                  <Card.Body>
                    <Card.Title as='h5'>Car Rentals</Card.Title>
                    {isListLoading ? (
                      <Loader />
                    ) : allTransports.length === 0 ? (
                      <Message variant='info'>No Car rentals Found</Message>
                    ) : (
                      <>
                        {allTransports.map((transport) => (
                          <Card className='shadow my-2'>
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

                                  <Card.Text style={{ color: 'red' }}>
                                    <strong>Price: </strong>
                                    BDT{' '}
                                    {transport.price -
                                      (transport.price *
                                        transport.priceDiscount) /
                                        100}{' '}
                                    <TbCurrencyTaka />
                                  </Card.Text>
                                  <Card.Text>
                                    <strong>
                                      {transport.priceDiscount > 0
                                        ? transport.priceDiscount + '% off'
                                        : 'No discount available'}
                                    </strong>
                                  </Card.Text>
                                  <Link
                                    to={`/transportBooking/${transport._id}`}
                                    className='btn btn-success me-2'
                                  >
                                    Book Now
                                  </Link>
                                  <Link
                                    to={`/transportDetailsTourist/${transport._id}`}
                                    className='btn btn-warning'
                                  >
                                    View Details
                                  </Link>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        ))}
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default TransportByDestinationScreen
