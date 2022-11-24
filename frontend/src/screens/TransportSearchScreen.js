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
} from 'react-bootstrap'
import { MdLocationOn } from 'react-icons/md'
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
  const [isRental, setIsRental] = useState(searchParams.get('rental') || false)
  const [modifySearch, setModifySearch] = useState(false)
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
      if (isRental) {
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
    return () => {
      dispatch(resetServiceList())
    }
  }, [dispatch])

  return (
    <div>
      <Container className='mb-3 pt-5'>
        <Card className='mb-3 pt-5 bg-light shadow'>
          <Row>
            <Card.Text as='h2' className='font-weight-bolder text-center'>
              Search Transports
            </Card.Text>
          </Row>
          <Row className='my-5 mx-3'>
            <Col>
              <Card.Text>Depart From</Card.Text>
              <Form.Group className='mb-3' controlId='departFrom'>
                <Form.Control
                  type='text'
                  placeholder='Depart From'
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Card.Text>Depart To</Card.Text>
              <Form.Group className='mb-3' controlId='departTo'>
                <Form.Control
                  type='text'
                  placeholder='Depart To'
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col style={{ width: '15px' }}>
              <Card.Text>Depart On</Card.Text>
              <Form.Group className='mb-3' controlId='departOn'>
                <InputGroup>
                  <div
                    className='cancle-icon'
                    style={{
                      position: 'absolute',
                      right: '5px',
                      top: '5px',
                      zIndex: '9999',
                      width: '3vh',
                    }}
                  ></div>
                </InputGroup>
                <Form.Control type='date'></Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Card.Text>Return On</Card.Text>
              <Form.Group className='mb-3' controlId='returnOn'>
                <InputGroup>
                  <div
                    className='cancle-icon'
                    style={{
                      position: 'absolute',
                      right: '5px',
                      top: '5px',
                      zIndex: '9999',
                      width: '3vh',
                    }}
                  ></div>
                </InputGroup>
                <Form.Control type='date'></Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Card.Text>Category</Card.Text>
              <Form.Group className='mb-3' controlId='category'>
                <Form.Control
                  className='form-select'
                  as='select'
                  type='select'
                  placeholder='Select Category'
                >
                  <option value='AC'>AC</option>
                  <option value='Non AC'>Non AC</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Card>
        <Card className='mb-3'>
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
        </Card>
      </Container>
    </div>
  )
}

export default TransportScreen
