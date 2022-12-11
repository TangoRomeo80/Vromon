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
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  createDestination,
  resetDestinationCreate,
} from '../features/destination/destinationSlice.js'
import Loader from '../components/Loader'
import districts from '../staticData/districts'
import Message from '../components/Message'
import { toast } from 'react-toastify'

const DestinationCreateScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    destination,
    isCreateError,
    isCreateSuccess,
    isCreateLoading,
    createErrorMessage,
  } = useSelector((state) => state.destination)

  const [name, setName] = useState('')
  const [district, setDistrict] = useState('')
  const [division, setDivision] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [coverImg, setCoverImg] = useState('')
  const [images, setImages] = useState([])
  const [mapEmbed, setMapEmbed] = useState('')
  const [searchSelected, setSearchSelected] = useState(true)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    if (isCreateError) {
      toast.error(createErrorMessage, { position: 'top-center' })
    } else if (isCreateSuccess) {
      toast.success('Destination created successfully', {
        position: 'top-center',
      })
      navigate(`/destinationDetails/${destination._id}`)
    }
  }, [
    userInfo,
    isCreateSuccess,
    isCreateError,
    createErrorMessage,
    destination,
    navigate,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetDestinationCreate())
    }
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    if (
      name !== '' &&
      division !== '' &&
      district !== '' &&
      address !== '' &&
      description !== ''
    ) {
      dispatch(
        createDestination({
          name,
          division,
          district,
          address,
          description,
          coverImg,
          images,
          mapEmbed,
        })
      )
    }
  }

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

  const filterMapEmbed = (e) => {
    const mapEmbed = e.target.value
    let rx = /(?<=src=").*?(?=[\*"])/g
    let filterEmbed = mapEmbed.match(rx)
    setMapEmbed(filterEmbed[0])
  }

  return (
    <>
      {isCreateLoading ? (
        <Loader />
      ) : (
        <Container className='pt-5'>
          <Row className='pb-5'>
            <Card.Text as='h2' className='font-weight-bolder text-center'>
              Create Destination
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
                        className='mb-3'
                        type='file'
                        id='image-file'
                        label='Cover Image'
                        onChange={uploadCoverImageFileHandler}
                      ></Form.Control>
                    </Form.Group>
                  </Card.Body>
                </Card>
                <Card className='mb-4'>
                  <Card.Header>Other Images</Card.Header>
                  <Card.Body className='text-center'>
                    <img
                      className='mb-2'
                      alt='Other Images'
                      style={{ height: '10rem', borderRadius: '50%' }}
                    />
                    <Form.Group controlId='image 1'>
                      <Form.Label>Upload New Image</Form.Label>
                      <Form.Control
                        className='mb-3'
                        type='file'
                        id='image-file'
                        label='Cover Image'
                      ></Form.Control>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={8} xl={9}>
                <Card className='mb-4'>
                  <Card.Header>Destination Information</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className='mb-3'
                          controlId='destinationName'
                        >
                          <Form.Label className='small mb-1'>
                            Destination Name
                          </Form.Label>
                          <Form.Control
                            required
                            type='text'
                            placeholder={
                              name === ''
                                ? 'Destination Name is Required'
                                : 'Enter Destination Name'
                            }
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      <Col lg={6} md={6} sm={12}>
                        <Form.Label className='small mb-1'>
                          Select Division
                        </Form.Label>
                        <Form.Group className='mb-3' controlId='searchDivision'>
                          <Form.Control
                            required
                            className='form-select'
                            as='select'
                            type='select'
                            placeholder={
                              division === ''
                                ? 'Division is Required'
                                : 'Select Division'
                            }
                            value={division}
                            onChange={(e) => setDivision(e.target.value)}
                          >
                            <option disabled selected value=''>
                              Select Division
                            </option>
                            <option value='Dhaka'>Dhaka</option>
                            <option value='Chittagong'>Chittagong</option>
                            <option value='Sylhet'>Sylhet</option>
                            <option value='Rajshahi'>Rajshahi</option>
                            <option value='Khulna'>Khulna</option>
                            <option value='Barisal'>Barisal</option>
                            <option value='Rangpur'>Rangpur</option>
                            <option value='Mymensingh'>Mymensingh</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className='mb-3' controlId='districtName'>
                          <Form.Label className='small mb-1'>
                            District Name
                          </Form.Label>
                          <Form.Control
                            required
                            type='text'
                            placeholder={
                              district === ''
                                ? 'District Name is Required'
                                : 'Enter District Name'
                            }
                            value={district}
                            onChange={(e) => {
                              setDistrict(e.target.value)
                              setSearchSelected(false)
                            }}
                          ></Form.Control>
                        </Form.Group>

                        {district && !searchSelected && (
                          <ListGroup
                            style={{
                              position: 'absolute',
                              zIndex: '9999',
                            }}
                          >
                            {districts
                              .filter((districtName) =>
                                districtName
                                  .toLowerCase()
                                  .startsWith(district.toLowerCase())
                              )
                              .map((districtName, index) => (
                                <ListGroup.Item
                                  key={index}
                                  onClick={(e) => {
                                    setDistrict(e.target.innerText)
                                    setSearchSelected(true)
                                  }}
                                >
                                  {districtName}
                                </ListGroup.Item>
                              ))}
                          </ListGroup>
                        )}

                        <Form.Group className='mb-3' controlId='mapEmbed'>
                          <Form.Label className='small mb-1'>
                            Embeded map share link
                          </Form.Label>
                          <Form.Control
                            type='text'
                            placeholder={
                              mapEmbed === ''
                                ? 'Embeded map is required'
                                : 'Enter Embeded map from google maps'
                            }
                            value={mapEmbed}
                            onChange={filterMapEmbed}
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className='mb-3'
                          controlId='destinationAddress'
                        >
                          <Form.Label className='small mb-1'>
                            Destination Address
                          </Form.Label>
                          <Form.Control
                            required
                            as='textarea'
                            rows={4}
                            placeholder={
                              address === ''
                                ? 'Address is Required'
                                : 'Enter Destination Address'
                            }
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group
                          className='mb-3'
                          controlId='destinationDescription'
                        >
                          <Form.Label className='small mb-1'>
                            Destination Description
                          </Form.Label>
                          <Form.Control
                            required
                            as='textarea'
                            rows={4}
                            placeholder={
                              description === ''
                                ? 'Description is Required'
                                : 'Detailed Description of Destination'
                            }
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className='py-4'>
                      <Button variant='outline-dark' size='md' type='submit'>
                        <b>Create Destination</b>
                      </Button>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </>
  )
}

export default DestinationCreateScreen
