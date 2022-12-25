import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Row, Col, Container, Card, Button, Form, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getAllDestinations,
  resetDestinationList,
} from '../features/destination/destinationSlice'
import { FaPlus } from 'react-icons/fa'

const AdminDestinationListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    destinations,
    isListLoading,
    isListSuccess,
    isListError,
    listErrorMessage,
  } = useSelector((state) => state.destination)

  const [filteredDestinations, setFilteredDestinations] = useState([])
  const [divisionSearch, setDivisionSearch] = useState('')
  const [districtSearch, setDistrictSearch] = useState('')
  const [nameSearch, setNameSearch] = useState('')

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'admin') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (isListError) {
      toast.error(listErrorMessage, { position: 'top-center' })
    } else if (isListSuccess && destinations.length > 0) {
      setFilteredDestinations(
        destinations
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
          .filter((destination) => {
            if (nameSearch === '') {
              return destination
            } else if (
              destination.name.toLowerCase().includes(nameSearch.toLowerCase())
            ) {
              return destination
            }
          })
      )
    } else {
      dispatch(getAllDestinations())
    }
  }, [
    isListError,
    isListSuccess,
    listErrorMessage,
    districtSearch,
    divisionSearch,
    nameSearch,
    dispatch,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetDestinationList())
    }
  }, [dispatch])

  return (
    <Container classname='pt-3'>
      {isListLoading ? (
        <Loader />
      ) : isListError ? (
        <Message variant='danger'>{listErrorMessage}</Message>
      ) : (
        <>
          <Row>
            <Col className='d-flex justify-content-center'>
              <h1>Destinations</h1>
            </Col>
          </Row>
          <Row className='pb-2'>
            <Col sm={4} md={2} lg={2}>
              <Link className='btn btn-primary my-3' to='/adminDash'>
                Back to Dashboard
              </Link>
            </Col>
            <Col sm={4} md={2} lg={2}>
              <Link className='btn btn-success my-3' to='/destinationCreate'>
                <FaPlus />
                Create Destination
              </Link>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col sm={12} md={4} lg={4}>
              <Form.Control
                shadow
                type='text'
                name='nameSearch'
                onChange={(e) => setNameSearch(e.target.value)}
                placeholder='Search Destination by name...'
              ></Form.Control>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <Form.Control
                shadow
                type='text'
                name='districtSearch'
                onChange={(e) => setDistrictSearch(e.target.value)}
                placeholder='Search Destination by district...'
              ></Form.Control>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <Form.Control
                shadow
                type='text'
                name='divisionSearch'
                onChange={(e) => setDivisionSearch(e.target.value)}
                placeholder='Search Destination by division...'
              ></Form.Control>
            </Col>
          </Row>
          <Row className='my-4'>
            <Col sm={12} md={12} lg={12}>
              <Card>
                <Card.Header
                  as='h5'
                  className='d-flex justify-content-center mb-3'
                >
                  Destinaitons
                </Card.Header>
                <Card.Body>
                  <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>District</th>
                        <th>Division</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDestinations.map((destination) => (
                        <LinkContainer
                          to={`/adminDestinationDetail/${destination._id}`}
                        >
                          <tr key={destination._id}>
                            <td>{destination.name}</td>
                            <td>{destination.district}</td>
                            <td>{destination.division}</td>
                            <td>{destination.rating}</td>
                          </tr>
                        </LinkContainer>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default AdminDestinationListScreen
