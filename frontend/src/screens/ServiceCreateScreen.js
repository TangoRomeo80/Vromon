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
                  <Card.Body></Card.Body>
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
