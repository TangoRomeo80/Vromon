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
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { MdLocationOn } from 'react-icons/md'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import Moment from 'moment'
import {
  getTourById,
  resetServiceDetails,
} from '../features/service/serviceSlice'
import AddServiceReview from '../components/AddServiceReview'
import ReadServiceReviews from '../components/ReadServiceReviews'

const TourDetailsTourist = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const {
    tour,
    isDetailsLoading,
    isDetailsError,
    isDetailsSuccess,
    detailsErrorMessage,
  } = useSelector((state) => state.service)

  const [tourDetails, setTourDetails] = useState({})

  const reFetchTour = () => {
    dispatch(getTourById(params.id))
  }

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: 'top-center' })
    } else if (isDetailsSuccess) {
      setTourDetails(tour)
    } else {
      dispatch(getTourById(params.id))
    }
  }, [dispatch, tour, isDetailsSuccess, isDetailsError, detailsErrorMessage])

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
        tour && (
          <>
            <Row className='pb-4'>
              <Card.Text as='h2' className='font-weight-bolder text-center'>
                Details Information of {tour.serviceName}
              </Card.Text>
            </Row>

            <Row>
              <Col>
                <Card>
                  <Card.Img
                    cascade
                    className='img-fluid'
                    src={tour.coverImg}
                    style={{ maxHeight: '45vh', objectFit: 'cover' }}
                  />
                  <Card.Body cascade>
                    <Card.Title as='h3'>{tour.tourInfo.name}</Card.Title>
                    <Card.Text>
                      <MdLocationOn /> {tour.destination.district}
                    </Card.Text>
                    <Card.Text>
                      <Rating
                        value={tour.rating}
                        text={`${tour.numOfRatings} reviews`}
                        num={tour.numOfRatings}
                      />
                    </Card.Text>
                    <Card.Text>
                      <AddServiceReview reset={reFetchTour} id={params.id} />
                      <ReadServiceReviews service={tour} user />
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
                  {tour.images.length === 0 ? (
                    <Carousel.Item>
                      <img
                        className='d-block w-100'
                        src={tour.coverImg}
                        alt='Destination Images'
                        style={{ maxHeight: '45vh', objectFit: 'cover' }}
                      />
                    </Carousel.Item>
                  ) : (
                    tour.images.map((image, index) => (
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
                    Information About {tour.serviceName}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <strong>Tour Package Name : </strong>
                      {tour.tourInfo.name}
                    </Card.Text>
                    <Card.Text>
                      <strong>Location : </strong>
                      {tour.destination.district}
                    </Card.Text>

                    <Card.Text>
                      <strong>Max Travelers : </strong>
                      {tour.tourInfo.maxGroupSize}
                    </Card.Text>
                    <Card.Text>
                      <strong>Travel Date : </strong>
                      {Moment(tour.tourInfo.travelDate).format('DD MMM YYYY')}
                    </Card.Text>
                    <Card.Text>
                      <strong>Lead Tour Guide : </strong>
                      {tour.tourInfo.leadGuideName}
                    </Card.Text>
                    <Card.Text>
                      <strong>Cost : </strong>
                      {tour.price}
                    </Card.Text>
                    <Card.Text>
                      <strong>Discount : </strong>
                      {tour.priceDiscount}%
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

export default TourDetailsTourist
