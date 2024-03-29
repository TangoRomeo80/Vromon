import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Row, Col, Container, Card, Form, Button, Modal } from 'react-bootstrap'
import { MdLocationOn } from 'react-icons/md'
import { FaFilter } from 'react-icons/fa'
import { TbCurrencyTaka } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import {
  getAllAccomodations,
  resetServiceList,
} from '../features/service/serviceSlice'
import SearchStays from '../components/SearchStays'
import Rating from '../components/Rating'

const StaysSearchScreen = () => {
  const [maxPrice, setMaxPrice] = useState(5000)
  const [searchHotel, setSearchHotel] = useState('')

  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()

  const [allAccomodations, setAllAccomodations] = useState([])
  const [checkinDateSearch, setCheckinDateSearch] = useState(
    searchParams.get('checkinDate') || null
  )
  const [checkoutDateSearch, setCheckoutDateSearch] = useState(
    searchParams.get('checkoutDate') || null
  )
  const [guestCountSearch, setGuestCountSearch] = useState(
    searchParams.get('guestCount') * 1 || 1
  )
  const [roomCountSearch, setRoomCountSearch] = useState(
    searchParams.get('roomCount') * 1 || 1
  )
  const [modifySearch, setModifySearch] = useState(false)
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 ? true : false
  )
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const {
    accomodations,
    isListLoading,
    isListSuccess,
    isListError,
    listErrorMessage,
  } = useSelector((state) => state.service)

  useEffect(() => {
    if (isListError) {
      toast.error(listErrorMessage, { position: 'top-center' })
    } else if (isListSuccess) {
      const filteredServices = accomodations
        .filter((service) => {
          if (checkinDateSearch === null) {
            return service
          } else if (
            new Date(service.accomodationInfo.checkinDate)
              .toISOString()
              .split('T')[0] === checkinDateSearch
          ) {
            return service
          }
        })
        .filter((service) => {
          if (checkoutDateSearch === null) {
            return service
          } else if (
            new Date(service.accomodationInfo.checkoutDate)
              .toISOString()
              .split('T')[0] === checkoutDateSearch
          ) {
            return service
          }
        })
        .filter((service) => {
          if (guestCountSearch === 1) {
            return service
          } else if (service.accomodationInfo.maxGuests >= guestCountSearch) {
            return service
          }
        })
        .filter((service) => {
          if (roomCountSearch === 1) {
            return service
          } else if (service.accomodationInfo.rooms >= roomCountSearch) {
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
      setAllAccomodations(filteredServices)
    } else {
      dispatch(getAllAccomodations())
    }
  }, [
    dispatch,
    checkinDateSearch,
    checkoutDateSearch,
    guestCountSearch,
    roomCountSearch,
    isListError,
    isListSuccess,
    accomodations,
    listErrorMessage,
    maxPrice,
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
        <Col lg={8} md={8} sm={12}>
          <Card.Text as='h3'>Find Your Desired Accomodations</Card.Text>
          <Card.Text>
            {checkinDateSearch === null &&
            checkoutDateSearch === null &&
            guestCountSearch === 1 &&
            roomCountSearch === 1
              ? 'Find Your Desired Accomodations or Hotels'
              : `Search Queries (Check In Date : ${checkinDateSearch}, Check Out Date : ${checkoutDateSearch}, Guest(s) : ${guestCountSearch}, Room(s) : ${roomCountSearch})`}
          </Card.Text>
        </Col>
        <Col lg={4} md={4} sm={12} className='d-flex justify-content-end'>
          <Button onClick={() => setModifySearch(!modifySearch)}>
            {modifySearch ? 'Cancel Search' : 'Modify Search'}
          </Button>
        </Col>
      </Row>

      <Row className='my-3'>{modifySearch && <SearchStays />}</Row>

      <Row>
        {/* Left Column */}
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
                  <Modal.Title>Filters for Stays Services</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className='mb-3' controlId='busType'>
                      <Form.Label>Number of Rooms</Form.Label>
                      <Form.Control
                        type='text'
                        className='shadow'
                        placeholder='Enter Number of Rooms'
                        value={roomCountSearch}
                        onChange={(e) => setRoomCountSearch(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='busType'>
                      <Form.Label>Number of Guests</Form.Label>
                      <Form.Control
                        type='text'
                        className='shadow'
                        placeholder='Enter Number of Guest'
                        value={guestCountSearch}
                        onChange={(e) => setGuestCountSearch(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='priceRange'>
                      <Form.Label>
                        Maximum Price Range: BDT {maxPrice}
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
                  <Card.Title as='h5'>Filters for Stays Services</Card.Title>
                  <Form>
                    <Form.Group className='mb-3' controlId='busType'>
                      <Form.Label>Number of Rooms</Form.Label>
                      <Form.Control
                        type='text'
                        className='shadow'
                        placeholder='Enter Number of Rooms'
                        value={roomCountSearch}
                        onChange={(e) => setRoomCountSearch(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='busType'>
                      <Form.Label>Number of Guests</Form.Label>
                      <Form.Control
                        type='text'
                        className='shadow'
                        placeholder='Enter Number of Guest'
                        value={guestCountSearch}
                        onChange={(e) => setGuestCountSearch(e.target.value)}
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
        <Col xs={12} md={9} xl={9}>
          <Card className='shadow'>
            <Card.Body>
              <Row className='my-2'>
                <Card.Title as='h5' className='mx-3'>
                  Available PLaces to Stay
                </Card.Title>
                <Card.Text className='mx-3'>
                  *Price is per night per room & includes VAT & Taxes
                </Card.Text>
              </Row>

              {isListLoading ? (
                <Loader />
              ) : allAccomodations.length <= 0 ? (
                <Message variant='danger'>
                  No Hotels or Accomodations Found. Please Modify Search
                  Queries!
                </Message>
              ) : (
                <>
                  {allAccomodations.map((accomodation) => (
                    <LinkContainer to=''>
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
                                {accomodation.price -
                                  (accomodation.price *
                                    accomodation.priceDiscount) /
                                    100}
                                <TbCurrencyTaka className='mb-1' />
                              </Card.Text>
                              <Card.Text>
                                <strong>
                                  {accomodation.priceDiscount > 0
                                    ? accomodation.priceDiscount + '% off'
                                    : 'No discount available'}
                                </strong>
                              </Card.Text>

                              <Link
                                to={`/staysBooking/${accomodation._id}`}
                                className='btn btn-success mb-2'
                              >
                                Book Now
                              </Link>
                              <Link
                                to={`/staysDetailsTourist/${accomodation._id}`}
                                className='btn btn-warning'
                              >
                                View Details
                              </Link>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    </LinkContainer>
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

export default StaysSearchScreen
