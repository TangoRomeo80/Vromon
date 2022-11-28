import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { Row, Col, Container, Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { MdDateRange, MdLocationOn } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
  getTopDestinations,
  resetDestinationList,
} from '../features/destination/destinationSlice'
import Rating from './Rating'

const PopularDestinations = () => {
  const dispatch = useDispatch()

  const [topDestinations, setTopDestinations] = useState([])

  const {
    destinations,
    isListLoading,
    isListSuccess,
    isListError,
    listErrorMessage,
  } = useSelector((state) => state.destination)

  useEffect(() => {
    if (isListError) {
      toast.error(listErrorMessage, { position: 'top-center' })
    }
    if (isListSuccess) {
      setTopDestinations(destinations)
    } else {
      dispatch(getTopDestinations())
    }
  }, [dispatch, destinations, isListSuccess, isListError, listErrorMessage])

  useEffect(() => {
    return () => {
      dispatch(resetDestinationList())
    }
  }, [dispatch])

  return (
    <div>
      <Container>
        <h2 className='font-weight-bold text-center mb-4'>
          Popular Destinations Right Now
        </h2>
        <Row className='my-4'>
          {destinations.map((destination, idx) => (
            <Col xs={12} md={idx === 0 ? 12 : 3} lg={idx === 0 ? 12 : 3}>
              <LinkContainer to={`/destinationDetails/${destination._id}`}>
                <Card key={destination._id} className='mb-2'>
                  <Card.Img
                    cascade
                    className='img-fluid'
                    src='/LightningDeals/test.jpg'
                    style={{ maxHeight: '40vh', objectFit: 'cover' }}
                  />

                  <Card.Body cascade>
                    <Card.Title>{destination.name}</Card.Title>
                    <Card.Text>
                      <MdLocationOn /> {destination.district},
                      {destination.division}
                    </Card.Text>
                    <Card.Text>
                      <Rating
                        value={destination.rating}
                        text={`${destination.numOfRatings} reviews`}
                      />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </LinkContainer>
            </Col>
          ))}
        </Row>

        <Row className='py-4'>
          <LinkContainer to='/destinations'>
            <Button variant='outline-dark' size='md'>
              <b>Show More</b>
            </Button>
          </LinkContainer>
        </Row>
      </Container>
    </div>
  )
}

export default PopularDestinations
