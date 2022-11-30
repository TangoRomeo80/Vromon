import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Row,
  Col,
  Container,
  Card,
  Form,
  InputGroup,
  Button,
  Modal,
} from 'react-bootstrap'
import { MdLocationOn } from 'react-icons/md'
import { FaFilter } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllTransports,
  resetServiceList,
} from '../features/service/serviceSlice'
import Message from '../components/Message'
import Loader from '../components/Loader'
import SearchTransports from '../components/SearchTransports'

const TransportScreen = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()

  const [allTransports, setAllTransports] = useState([])
  const [departFrom, setDepartFrom] = useState(searchParams.get('from') || '')
  const [departTo, setDepartTo] = useState(searchParams.get('to') || '')
  const [departDate, setDepartDate] = useState(searchParams.get('dep') || null)
  const [returnDate, setReturnDate] = useState(searchParams.get('ret') || null)
  const [pickUpFrom, setPickUpFrom] = useState(searchParams.get('pick') || '')
  const [dropOffTo, setDropOffTo] = useState(searchParams.get('drop') || '')
  const [pickUpDate, setPickUpDate] = useState(
    searchParams.get('pickDate') || null
  )
  const [dropOffDate, setDropOffDate] = useState(
    searchParams.get('dropDate') || null
  )
  const [pickUpTime, setPickUpTime] = useState(
    searchParams.get('pickTime') || ''
  )
  const [dropOffTime, setDropOffTime] = useState(
    searchParams.get('dropTime') || ''
  )
  const [isRental, setIsRental] = useState(
    searchParams.get('rental') === 'true' ? true : false
  )
  const [modifySearch, setModifySearch] = useState(false)
  const [maxPrice, setMaxPrice] = useState(5000)
  const [busType, setBusType] = useState('AC')
  const [busProvider, setBusProvider] = useState('')
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 ? true : false
  )
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const {
    services,
    isListLoading,
    isListSuccess,
    isListError,
    listErrorMessage,
  } = useSelector((state) => state.service)

  useEffect(() => {
    if (isListError) {
      toast.error(listErrorMessage, { position: 'top-center' })
    }
    if (isListSuccess) {
      if (!isRental) {
        const filteredServices = services
          .filter((service) => {
            if (departFrom === '') {
              return service
            } else if (
              service.transportInfo.departFrom
                .toLowerCase()
                .includes(departFrom.toLowerCase())
            ) {
              return service
            }
          })
          .filter((service) => {
            if (departTo === '') {
              return service
            } else if (
              service.transportInfo.departTo
                .toLowerCase()
                .includes(departTo.toLowerCase())
            ) {
              return service
            }
          })
          .filter((service) => {
            if (departDate === null) {
              return service
            } else if (service.transportInfo.departDate === departDate) {
              return service
            }
          })
          .filter((service) => {
            if (returnDate === null) {
              return service
            }
            if (service.transportInfo.returnDate === returnDate) {
              return service
            }
          })
        setAllTransports(filteredServices)
      } else {
        const filteredServices = services
          .filter((service) => {
            if (pickUpFrom === '') {
              return service
            } else if (
              service.transportInfo.pickUpFrom
                .toLowerCase()
                .includes(pickUpFrom.toLowerCase())
            ) {
              return service
            }
          })
          .filter((service) => {
            if (dropOffTo === '') {
              return service
            } else if (
              service.transportInfo.dropOffTo
                .toLowerCase()
                .includes(dropOffTo.toLowerCase())
            ) {
              return service
            }
          })
          .filter((service) => {
            if (pickUpDate === null) {
              return service
            } else if (service.transportInfo.pickUpDate === pickUpDate) {
              return service
            }
          })
          .filter((service) => {
            if (dropOffDate === null) {
              return service
            } else if (service.transportInfo.dropOffDate === dropOffDate) {
              return service
            }
          })
        // .filter((service) => {
        //   if (pickUpTime === '') {
        //     return service
        //   } else if (service.transportInfo.pickUpTime == pickUpTime) {
        //     return service
        //   }
        // })
        // .filter((service) => {
        //   if (dropOffTime === '') {
        //     return service
        //   } else if (service.transportInfo.dropOffTime == dropOffTime) {
        //     return service
        //   }
        // })
        setAllTransports(filteredServices)
      }
    } else {
      dispatch(getAllTransports())
    }
  }, [dispatch, services, isListSuccess, isListError, listErrorMessage])

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
    <div>
      <Container className='mb-3'>
        <Row className='mb-2 pt-3'>
          <Col lg={6} md={6} sm={12} className='d-flex justify-content-center'>
            <Card.Text>
              {isRental ? (
                <>
                  {pickUpFrom && pickUpDate && dropOffTo && dropOffDate
                    ? `Rental Pick up from ${pickUpFrom} to ${dropOffTo} on ${pickUpDate} at ${pickUpTime}`
                    : 'Car rental list'}
                </>
              ) : (
                <>
                  {departFrom && departDate && departTo
                    ? `Transport from ${departFrom} to ${departTo} on ${departDate}`
                    : 'Transport list'}
                </>
              )}
            </Card.Text>
          </Col>
          <Col lg={6} md={6} sm={12} className='d-flex justify-content-center'>
            <Button onClick={() => setModifySearch(!modifySearch)}>
              {modifySearch ? 'Cancel Search' : 'Modify Search'}
            </Button>
          </Col>
        </Row>

        {modifySearch && (
          <Row className='mb-2 pt-3'>
            <Col
              lg={12}
              md={12}
              sm={12}
              className='d-flex justify-content-center align-items-center'
            >
              <Card className='text-center w-100 shadow bg-light'>
                <Card.Body>
                  <SearchTransports
                    rental={isRental}
                    pick={pickUpFrom}
                    drop={dropOffTo}
                    pickDate={pickUpDate}
                    dropDate={dropOffDate}
                    pickTime={pickUpTime}
                    dropTime={dropOffTime}
                    from={departFrom}
                    to={departTo}
                    dep={departDate}
                    ret={returnDate}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* <Card className='mb-3'>
          <Row className='d-flex'>
            <Col sm={4} md={3} lg={3}>
              <Card.Img
                src='/Destinations/Test.jpg'
                className='img-fluid rounded-start'
                variant='top'
                style={{ objectFit: 'cover', height: '180px' }}
              />
            </Col>
            <Col sm={4} md={4} lg={6}>
              <Card.Body>
                <Card.Title as='h5'>Hanif Transport</Card.Title>
                <Card.Text>
                  <MdLocationOn />
                  Dhaka to Sylhet
                </Card.Text>
                <Card.Text>&nbsp; Fair : 600/- BDT</Card.Text>
              </Card.Body>
            </Col>

            <Col sm={4} md={5} lg={3} className='d-flex justify-content-end'>
              <Card.Body>
                <Card.Text className='my-3'>Time : 07:30AM</Card.Text>
                <Card.Text>Type : Non AC</Card.Text>

                <Button>Book Now</Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>

        <Card className=' mb-3'>
          <Row className='d-flex'>
            <Col sm={4} md={3} lg={3}>
              <Card.Img
                src='/Destinations/Test.jpg'
                className='img-fluid rounded-start'
                variant='top'
                style={{ objectFit: 'cover', height: '180px' }}
              />
            </Col>
            <Col sm={4} md={4} lg={6}>
              <Card.Body>
                <Card.Title as='h5'>Hanif Transport</Card.Title>
                <Card.Text>
                  <MdLocationOn />
                  Dhaka to Sylhet
                </Card.Text>
                <Card.Text> &nbsp;Fair : 600/- BDT</Card.Text>
              </Card.Body>
            </Col>

            <Col sm={4} md={5} lg={3} className='d-flex justify-content-end'>
              <Card.Body>
                <Card.Text className='my-3'>Time : 07:30AM</Card.Text>
                <Card.Text>Type : Non AC</Card.Text>

                <Button>Book Now</Button>
              </Card.Body>
            </Col>
          </Row>
        </Card> */}
        <Row>
          <Col lg={3} md={3} sm={12}>
            {isMobile ? (
              <>
                <Button
                  className='ms-1'
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
                    <Modal.Title>Filters for Bus Services</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className='mb-3' controlId='busType'>
                        <Form.Label>Bus Type</Form.Label>
                        <Form.Select
                          aria-label='Default select example'
                          onChange={(e) => setBusType(e.target.value)}
                        >
                          <option value=''>All</option>
                          <option value='AC'>AC</option>
                          <option value='Non-AC'>Non AC</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='busProvider'>
                        <Form.Label>Bus Provider</Form.Label>
                        <Form.Select
                          aria-label='Default select example'
                          onChange={(e) => setBusProvider(e.target.value)}
                        >
                          <option value=''>All</option>
                          {allTransports.map((transport) => (
                            <option value={transport._id}>
                              {transport.busProvider}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='priceRange'>
                        <Form.Label>Price Range: BDT{maxPrice}</Form.Label>
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
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TransportScreen
