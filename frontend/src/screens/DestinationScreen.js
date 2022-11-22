import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Row, Col, Container, Card, Form, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { MdDateRange, MdLocationOn } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getAllDestinations,
  resetDestinationList,
} from '../features/destination/destinationSlice'
import SearchDestinations from '../components/SearchDestinations'

const DestinationScreen = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()

  const [allDestinations, setAllDestinations] = useState([])
  const [divisionSearch, setDivisionSearch] = useState(
    searchParams.get('division') || ''
  )
  const [districtSearch, setDistrictSearch] = useState(
    searchParams.get('district') || ''
  )

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
      setAllDestinations(destinations)
    } else {
      dispatch(getAllDestinations())
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
        <Row className='mb-2 pt-3'>
          <Col
            lg={12}
            md={12}
            sm={12}
            className='d-flex justify-content-center align-items-center'
          >
            <Card className='text-center w-75 shadow bg-light'>
              <Card.Body>
                <SearchDestinations />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className='mb-2 pt-3'>
          <Col lg={12} md={12} sm={12}>
            {isListLoading ? (
              <Loader />
            ) : destinations.length <= 0 ? (
              <Message variant='danger'>
                No destinatin found for the searched division and district
              </Message>
            ) : (
              <Row className='my-4'>
                {destinations
                  .filter((destination) => {
                    if (divisionSearch === '') {
                      return destination
                    } else if (
                      destination.division
                        .toLowerCase()
                        .includes(divisionSearch.toLowerCase())
                    ) {
                      return destination
                    }
                  })
                  .filter((destination) => {
                    if (districtSearch === '') {
                      return destination
                    } else if (
                      destination.district
                        .toLowerCase()
                        .includes(districtSearch.toLowerCase())
                    ) {
                      return destination
                    }
                  })

                  .map((destination) => (
                    <Col xs={12} md={3}>
                      <LinkContainer to='/destinationDetails'>
                        <Card key={destination._id} className='mb-2'>
                          <Card.Img
                            cascade
                            className='img-fluid'
                            src='/LightningDeals/test.jpg'
                          />

                          <Card.Body cascade>
                            <Card.Title>{destination.name}</Card.Title>
                            <Card.Text>
                              <MdLocationOn /> {destination.district},{' '}
                              {destination.division}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </LinkContainer>
                    </Col>
                  ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DestinationScreen
