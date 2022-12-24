import React, { useEffect, useState } from 'react'
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Carousel,
} from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { MdLocationOn } from 'react-icons/md'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import Moment from 'moment'
import {
  getTransportById,
  resetServiceDetails,
} from '../features/service/serviceSlice'
import AddServiceReview from '../components/AddServiceReview'
import ReadServiceReviews from '../components/ReadServiceReviews'

const TransportDetailsTourist = () => {
  const dispatch = useDispatch()

  const params = useParams()

  const {
    transport,
    isDetailsLoading,
    isDetailsError,
    isDetailsSuccess,
    detailsErrorMessage,
  } = useSelector((state) => state.service)

  const [transportDetails, setTransportDetails] = useState({})

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: 'top-center' })
    } else if (isDetailsSuccess) {
      setTransportDetails(transport)
    } else {
      dispatch(getTransportById(params.id))
    }
  }, [
    dispatch,
    transport,
    isDetailsSuccess,
    isDetailsError,
    detailsErrorMessage,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetServiceDetails())
    }
  }, [dispatch])

  return (
    <Container className='pt-4'>
      {isDetailsLoading ? (
        <Loader />
      ) : isDetailsError ? (
        <Message variant='danger'>{detailsErrorMessage}</Message>
      ) : (
        transport && (
          <>
            <Row className='pb-4'>
              <Card.Text as='h2' className='font-weight-bolder text-center'>
                Details Information of {transport.serviceName}
              </Card.Text>
            </Row>

            <Row>
              <Col>
                <Card>
                  <Card.Img
                    cascade
                    className='img-fluid'
                    src={transport.coverImg}
                    style={{ maxHeight: '45vh', objectFit: 'cover' }}
                  />
                  <Card.Body cascade>
                    <Card.Title as='h3'>
                      {transport.transportInfo.carModel}
                    </Card.Title>
                    <Card.Text>
                      <MdLocationOn /> {transport.transportInfo.pickUpFrom} -{' '}
                      {transport.transportInfo.dropTo}
                    </Card.Text>
                    <Card.Text>
                      Yaha Rating Ayega ** Yaha Number of Ratings Ayega
                    </Card.Text>
                    <Card.Text>
                      Yaha Write Reviews Button Ayega ** Aur Yaha View Reviews
                      Button Ayega
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <h3 className='my-4 d-flex justify-content-center'>
              Detailed Information
            </h3>

            <Row className='my-3'>
              <Col lg={6} md={6} sm={12}>
                <Carousel>
                  {transport.images.length === 0 ? (
                    <Carousel.Item>
                      <img
                        className='d-block w-100'
                        src={transport.coverImg}
                        alt='Destination Images'
                        style={{ maxHeight: '45vh', objectFit: 'cover' }}
                      />
                    </Carousel.Item>
                  ) : (
                    transport.images.map((image, index) => (
                      <Carousel.Item>
                        <img
                          className='d-block w-100'
                          src={image}
                          alt='Destination Images'
                          style={{ maxHeight: '45vh', objectFit: 'cover' }}
                        />
                      </Carousel.Item>
                    ))
                  )}
                </Carousel>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Card>
                  <Card.Header as='h4' className='text-center'>
                    Information Of Transportation
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <strong>Company Name : </strong>
                      {transport.serviceName}
                    </Card.Text>
                    <Card.Text>
                      <strong>Car Model : </strong>
                      {transport.transportInfo.carModel}
                    </Card.Text>

                    <Card.Text>
                      <strong>Car Type : </strong>
                      {transport.transportInfo.carType}
                    </Card.Text>
                    <Card.Text>
                      <strong>Pick From : </strong>
                      {transport.transportInfo.pickUpFrom}
                    </Card.Text>
                    <Card.Text>
                      <strong>Drop To : </strong>
                      {transport.transportInfo.dropTo}
                    </Card.Text>
                    <Card.Text>
                      <strong>Pick Date : </strong>
                      {Moment(transport.transportInfo.pickUpDate).format(
                        'DD-MM-YYYY'
                      )}
                    </Card.Text>
                    <Card.Text>
                      <strong>Drop Date : </strong>
                      {Moment(transport.transportInfo.dropOffDate).format(
                        'DD-MM-YYYY'
                      )}
                    </Card.Text>
                    <Card.Text>
                      <strong>Cost : </strong>
                      {transport.price}
                    </Card.Text>
                    <Card.Text>
                      <strong>Discount : </strong>
                      {transport.priceDiscount}%
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )
      )}
    </Container>
  )
}

export default TransportDetailsTourist
