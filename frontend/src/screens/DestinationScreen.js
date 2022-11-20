import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
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
import districts from '../staticData/districts'

const DestinationScreen = () => {
  const dispatch = useDispatch()

  const [allDestinations, setAllDestinations] = useState([])

  const [divisionSearch, setDivisionSearch] = useState('')
  const [districtSearch, setDistrictSearch] = useState('')
  const [searchSelected, setSearchSelected] = useState(false)

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
      <Container className='mb-3 pt-5'>
        <Card className='mb-3 pt-5 bg-light shadow' >
          <Row>
            <Card.Text as='h2' className='font-weight-bolder text-center'>
              Search Destinations
            </Card.Text>
          </Row>
          <Row className='my-5 mx-3'>
            <Col>
              <Card.Text>Select Division</Card.Text>
              <Form.Group className='mb-3' controlId='searchDivision'>
                <Form.Control
                  className='form-select'
                  as='select'
                  type='select'
                  onChange={(e) => setDivisionSearch(e.target.value)}
                  placeholder='Select Division'
                >
                  <option disabled selected value='' >Select Division</option>
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

            {/* <Col>
              <Card.Text>Enter District</Card.Text>
              <Form.Group className='mb-3' controlId='searchDistrict'>
                <Form.Control
                  type='text'
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  placeholder='Enter District Name'
                ></Form.Control>
              </Form.Group>
            </Col> */}

            <Col>
            <Card.Text>Enter District</Card.Text>
            <Form.Group className='mb-3' controlId='searchDistrict'>
              <Form.Control
                type='text'
                placeholder='Enter District Name'
                value={districtSearch}
                onChange={(e) => {
                  setDistrictSearch(e.target.value)
                  setSearchSelected(false)
                }}
              ></Form.Control>
            </Form.Group>
            {districtSearch && !searchSelected && (
              <ListGroup
                style={{
                  position: 'absolute',
                  zIndex: '9999',
                }}
              >
                {districts
                  .filter((district) =>
                    district
                      .toLowerCase()
                      .startsWith(districtSearch.toLowerCase())
                  )
                  .map((district, index) => (
                    <ListGroup.Item
                      key={index}
                      onClick={(e) => {
                        setDistrictSearch(e.target.innerText)
                        setSearchSelected(true)
                      }}
                    >
                      {district}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            )}
          </Col>
          </Row>
        </Card>

        {isListLoading ? (
          <Loader />
        ) : isListError ? (
          <Message variant='danger'>{isListError}</Message>
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
      </Container>
    </div>
  )
}

export default DestinationScreen
