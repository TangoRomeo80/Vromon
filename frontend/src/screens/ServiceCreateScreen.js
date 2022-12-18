import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Carousel,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { toast } from 'react-toastify'
import {
  createService,
  resetServiceCreate,
} from '../features/service/serviceSlice'
import {
  getAllDestinations,
  resetDestinationList,
} from '../features/destination/destinationSlice'
import {
  getAllBusinesses,
  resetBusinessList,
} from '../features/business/businessSlice'

const ServiceCreateScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    service,
    isCreateError: isServiceCreateError,
    isCreateSuccess: isServiceCreateSuccess,
    isCreateLoading: isServiceCreateLoading,
    createErrorMessage: serviceCreateErrorMessage,
  } = useSelector((state) => state.destination)

  const {
    businesses,
    isListLoading: isBusinessListLoading,
    isListSuccess: isBusinessListSuccess,
    isListError: isBusinessListError,
    listErrorMessage: businessListErrorMessage,
  } = useSelector((state) => state.business)

  const {
    destinations,
    isListLoading: isDestinationListLoading,
    isListSuccess: isDestinationListSuccess,
    isListError: isDestinationListError,
    listErrorMessage: destinationListErrorMessage,
  } = useSelector((state) => state.destination)

  const [ownedBusinesses, setOwnedBusinesses] = useState([])
  const [coverImg, setCoverImg] = useState('')
  const [images, setImages] = useState([])
  const [serviceName, setServiceName] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [price, setPrice] = useState(0)
  const [priceDiscount, setPriceDiscount] = useState(0)
  const [destination, setDestination] = useState('')
  const [business, setBusiness] = useState('')

  useEffect(() => {
    if (isDestinationListError) {
      toast.error(destinationListErrorMessage, { position: 'top-center' })
    } else if (!isDestinationListSuccess) {
      dispatch(getAllDestinations())
    }
  }, [
    isDestinationListError,
    destinationListErrorMessage,
    isDestinationListSuccess,
    dispatch,
  ])

  useEffect(() => {
    if (isBusinessListError) {
      toast.error(businessListErrorMessage, { position: 'top-center' })
    } else if (isBusinessListSuccess) {
      setOwnedBusinesses(
        businesses.filter(
          (business) => business.businessOwner._id === userInfo._id
        )
      )
    } else {
      dispatch(getAllBusinesses())
    }
  }, [
    isBusinessListError,
    businessListErrorMessage,
    isBusinessListSuccess,
    businesses,
    userInfo,
    dispatch,
  ])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'businessowner') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    return () => {
      dispatch(resetServiceCreate())
      dispatch(resetDestinationList())
      dispatch(resetBusinessList())
    }
  }, [dispatch])

  const uploadCoverImageFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(
        `/api/upload${coverImg ? `/${coverImg.slice(8)}` : ''}`,
        formData,
        config
      )
      setCoverImg(data)
    } catch (error) {
      console.error(error)
    }
  }

  const uploadImageFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(`/api/upload/`, formData, config)

      setImages([...images, data])
    } catch (error) {
      console.error(error)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submit')
  }

  return (
    <>
      {isServiceCreateLoading ? (
        <Loader />
      ) : (
        <Container className='pt-5'>
          <Row className='pb-5'>
            <Card.Text as='h2' className='font-weight-bolder text-center'>
              Create Service
            </Card.Text>
          </Row>

          <Form onSubmit={submitHandler}>
            <Row>
              <Col xs={12} md={4} xl={3}>
                <Card className='mb-4'>
                  <Card.Header>Cover Image</Card.Header>
                  <Card.Body className='text-center'>
                    <Card.Img
                      cascade
                      className='img-fluid'
                      src={
                        coverImg !== '' ? coverImg : '/destinations/test.png'
                      }
                      style={{ height: '20vh', objectFit: 'cover' }}
                    />
                    <Form.Group controlId='image 1'>
                      <Form.Label>Upload New Image</Form.Label>
                      <Form.Control
                        required
                        className='mb-3'
                        type='file'
                        id='image-file'
                        label='Cover Image'
                        controlId='coverImg'
                        onChange={uploadCoverImageFileHandler}
                      ></Form.Control>
                    </Form.Group>
                  </Card.Body>
                </Card>
                <Card className='mb-4'>
                  <Card.Header>Other Images</Card.Header>
                  <Card.Body className='text-center'>
                    {images.length <= 0 ? (
                      <Card.Img
                        cascade
                        className='img-fluid'
                        src='/destinations/test.png'
                        style={{ height: '20vh', objectFit: 'cover' }}
                      />
                    ) : (
                      <Carousel>
                        {images.map((image, index) => (
                          <Carousel.Item>
                            <img
                              className='d-block w-100'
                              src={image}
                              alt={`Image-${index}`}
                              style={{ maxHeight: '20vh', objectFit: 'cover' }}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    )}

                    <Form.Group controlId='image 1'>
                      <Form.Label>Upload New Images</Form.Label>
                      <Form.Control
                        controlId='images'
                        className='mb-3'
                        type='file'
                        id='image-file'
                        label='Images'
                        onChange={uploadImageFileHandler}
                      ></Form.Control>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={8} xl={9}>
                <Card className='mb-4'>
                  <Card.Header>Service Information</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className='mb-3'
                          controlId='destinationName'
                        >
                          <Form.Label className='small mb-1'>
                            Service Name
                          </Form.Label>
                          <Form.Control
                            required
                            type='text'
                            placeholder={
                              serviceName === ''
                                ? 'Service Name is Required'
                                : 'Enter Service Name'
                            }
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Label className='small mb-1'>
                          Select Service Type
                        </Form.Label>
                        <Form.Group className='mb-3' controlId='searchDivision'>
                          <Form.Control
                            required
                            className='form-select'
                            as='select'
                            type='select'
                            placeholder={
                              serviceType === ''
                                ? 'Service Type is Required'
                                : 'Select Service Type'
                            }
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                          >
                            <option disabled selected value=''>
                              Select Service Type
                            </option>
                            <option value='transportation'>
                              transportation
                            </option>
                            <option value='accomodation'>accomodation</option>
                            <option value='tours'>tours</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Label className='small mb-1'>
                          Select Destinaiton
                        </Form.Label>
                        <Form.Group className='mb-3' controlId='destination'>
                          <Form.Control
                            required
                            className='form-select'
                            as='select'
                            type='select'
                            placeholder={
                              destination === ''
                                ? 'Destination is Required'
                                : 'Select Destination'
                            }
                            value={destination}
                            onChange={(e) => {
                              setDestination(e.target.value)
                            }}
                          >
                            <option disabled selected value=''>
                              Select Destination
                            </option>
                            {destinations.map((destination) => (
                              <option
                                value={destination._id}
                                key={destination._id}
                              >
                                {destination.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Label className='small mb-1'>
                          Select Business
                        </Form.Label>
                        <Form.Group className='mb-3' controlId='business'>
                          <Form.Control
                            required
                            className='form-select'
                            as='select'
                            type='select'
                            placeholder={
                              business === ''
                                ? 'Business is Required'
                                : 'Select Business'
                            }
                            value={business}
                            onChange={(e) => {
                              setBusiness(e.target.value)
                            }}
                          >
                            <option disabled selected value=''>
                              Select Business
                            </option>
                            {ownedBusinesses.map((business) => (
                              <option value={business._id} key={business._id}>
                                {business.businessName}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Label className='small mb-1'>
                          Price of service (BDT)
                        </Form.Label>
                        <Form.Group className='mb-3' controlId='price'>
                          <Form.Control
                            required
                            type='text'
                            placeholder={
                              price <= 0
                                ? 'Price is Required and cannot be less than 0'
                                : 'Enter Price'
                            }
                            value={price <= 0 ? '' : price}
                            onChange={(e) => {
                              if (e.target.value < 0 || isNaN(e.target.value)) {
                                setPrice(0)
                              } else setPrice(e.target.value * 1)
                            }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Label className='small mb-1'>
                          Discount percentage (If any)
                        </Form.Label>
                        <Form.Group className='mb-3' controlId='price'>
                          <Form.Control
                            type='text'
                            placeholder={
                              priceDiscount <= 0
                                ? 'Price discountneeds to be between 0 and 100'
                                : 'Enter Price'
                            }
                            value={
                              priceDiscount <= 0 || priceDiscount > 100
                                ? ''
                                : priceDiscount
                            }
                            onChange={(e) => {
                              if (
                                e.target.value < 0 ||
                                e.target.value > 100 ||
                                isNaN(e.target.value)
                              ) {
                                setPriceDiscount(0)
                              } else setPriceDiscount(e.target.value * 1)
                            }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    {serviceType !== '' && (
                      <>
                        {serviceType === 'transportation' ? (
                          <Row>
                            <h5 className='font-weight-bolder text-muted mb-3'>
                              Transportation Details
                            </h5>
                          </Row>
                        ) : serviceType === 'accomodation' ? (
                          <Row>
                            <h5 className='font-weight-bolder text-muted mb-3'>
                              Accomodation Details
                            </h5>
                          </Row>
                        ) : (
                          <Row>
                            <h5 className='font-weight-bolder text-muted mb-3'>
                              Tour Details
                            </h5>
                          </Row>
                        )}
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className='py-4'>
              <Button variant='outline-dark' size='md' type='submit'>
                <b>Create Service</b>
              </Button>
            </Row>
          </Form>
        </Container>
      )}
    </>
  )
}

export default ServiceCreateScreen
