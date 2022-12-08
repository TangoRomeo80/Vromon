import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { MdDateRange, MdLocationOn } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTours, resetServiceList } from '../features/service/serviceSlice'
import Rating from './Rating'

const LightningDeals = () => {
  const dispatch = useDispatch()

  const [topServices, setTopServices] = useState([])

  const { tours, isListLoading, isListSuccess, isListError, listErrorMessage } =
    useSelector((state) => state.service)

  useEffect(() => {
    if (isListError) {
      toast.error(listErrorMessage, { position: 'top-center' })
    }
    if (isListSuccess) {
      setTopServices(tours)
    } else {
      dispatch(getAllTours())
    }
  }, [dispatch, tours, isListSuccess, isListError, listErrorMessage])

  useEffect(() => {
    return () => {
      dispatch(resetServiceList())
    }
  }, [dispatch])

  return (
    <div>
      <Container>
        <h2 className='font-weight-bold text-center mb-4 my-4'>
          Lightning Deals
        </h2>

        <Row className='my-4'>
          {tours.map(
            (service, idx) =>
              idx < 10 && (
                <Col sm={12} md={3} lg={3}>
                  <Card>
                    <Card.Img
                      cascade
                      className='img-fluid'
                      src={service.coverImg}
                      style={{ height: '40vh', objectFit: 'cover' }}
                    />
                    <Card.Body cascade>
                      <Card.Title>{service.tourInfo.name}</Card.Title>
                      <Card.Text>
                        <MdDateRange /> &nbsp;{service.tourInfo.duration} days{' '}
                        <br />
                        <MdLocationOn /> &nbsp;{service.destination.name},{' '}
                        {service.destination.district}
                      </Card.Text>
                      <Card.Text style={{ fontWeight: 'bold' }}>
                        BDT {service.price}
                      </Card.Text>
                      <Card.Text>
                        <Rating
                          value={service.rating}
                          text={`${service.numOfRatings} reviews`}
                          num={service.numOfRatings}
                        />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
          )}
        </Row>

        <Row className='py-4'>
          <LinkContainer to='/tourSearch'>
            <Button variant='outline-dark' size='md'>
              <b>Show More</b>
            </Button>
          </LinkContainer>
        </Row>
      </Container>
    </div>
  )
}

export default LightningDeals
