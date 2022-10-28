import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Container,
  Card,
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getAuthedUser, resetAuth } from '../features/auth/authSlice'
import Moment from 'moment'

const SearchStays = () => {
  const [checkinDate, setCheckinDate] = useState('')
  const [checkoutDate, setCheckoutDate] = useState('')
  const [guestCount, setGuestCount] = useState('')
  const [roomCount, setRoomCount] = useState('')
  const [searchHotel, setSearchHotel] = useState('')

  return (
    <Card>
      <Row className='mt-3'>
        <Card.Text as='h5'>Search Stays</Card.Text>
      </Row>

      <Row className='my-5 mx-3'>
        <Col>
          <Card.Text>Search for Hotels</Card.Text>
          <Form.Group className='mb-3' controlId='searchHotel'>
            <Form.Control
              type='text'
              placeholder='Search for Hotels'
              value={searchHotel}
              onChange={(e) => setSearchHotel(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Check-In Date</Card.Text>
          <Form.Group className='mb-3' controlId='checkinDate'>
            <InputGroup>
              <div
                onClick={(e) => {
                  setCheckinDate('')
                }}
                className='cancle-icon'
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '5px',
                  zIndex: '9999',
                  width: '3vh',
                }}
              ></div>
            </InputGroup>
            <Form.Control
              type='date'
              placeholder={checkinDate === 'Select Check-In Date'}
              value={checkinDate}
              onChange={(e) => setCheckinDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Check-Out Date</Card.Text>
          <Form.Group className='mb-3' controlId='checkoutDate'>
            <InputGroup>
              <div
                onClick={(e) => {
                  setCheckoutDate('')
                }}
                className='cancle-icon'
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '5px',
                  zIndex: '9999',
                  width: '3vh',
                }}
              ></div>
            </InputGroup>
            <Form.Control
              type='date'
              placeholder={checkoutDate === 'Select Check-Out Date'}
              value={checkoutDate}
              onChange={(e) => setCheckoutDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Guests</Card.Text>
          <Form.Group className='mb-3' controlId='guestCount'>
            <Form.Control
              type='text'
              placeholder='Enter Number of Guest(s)'
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Rooms</Card.Text>
          <Form.Group className='mb-3' controlId='roomCount'>
            <Form.Control
              type='text'
              placeholder='Enter Number of Room(s)'
              value={roomCount}
              onChange={(e) => setRoomCount(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Card>
  )
}

const SearchTransports = () => {
  const [departFrom, setDepartFrom] = useState('')
  const [departTo, setDepartTo] = useState('')
  const [departOn, setDepartOn] = useState('')
  const [returnOn, setReturnOn] = useState('')
  const [passengerCount, setPassengerCount] = useState('')
  const [category, setCategory] = useState('')

  return (
    <div>
      <Card>
        <Row className='mt-3'>
          <Card.Text as='h5'>Search Transports</Card.Text>
        </Row>
        <Row className='my-5 mx-3'>
          <Col>
            <Card.Text>Depart From</Card.Text>
            <Form.Group className='mb-3' controlId='departFrom'>
              <Form.Control
                type='text'
                placeholder='Depart From'
                value={departFrom}
                onChange={(e) => setDepartFrom(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Depart To</Card.Text>
            <Form.Group className='mb-3' controlId='departTo'>
              <Form.Control
                type='text'
                placeholder='Depart To'
                value={departTo}
                onChange={(e) => setDepartTo(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col style={{ width: '15px' }}>
            <Card.Text>Depart On</Card.Text>
            <Form.Group className='mb-3' controlId='departOn'>
              <InputGroup>
                <div
                  onClick={(e) => {
                    setDepartOn('')
                  }}
                  className='cancle-icon'
                  style={{
                    position: 'absolute',
                    right: '5px',
                    top: '5px',
                    zIndex: '9999',
                    width: '3vh',
                  }}
                ></div>
              </InputGroup>
              <Form.Control
                type='date'
                value={departOn}
                onChange={(e) => setDepartOn(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Return On</Card.Text>
            <Form.Group className='mb-3' controlId='returnOn'>
              <InputGroup>
                <div
                  onClick={(e) => {
                    setReturnOn('')
                  }}
                  className='cancle-icon'
                  style={{
                    position: 'absolute',
                    right: '5px',
                    top: '5px',
                    zIndex: '9999',
                    width: '3vh',
                  }}
                ></div>
              </InputGroup>
              <Form.Control
                type='date'
                value={returnOn}
                onChange={(e) => setReturnOn(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Passengers</Card.Text>
            <Form.Group className='mb-3' controlId='passengerCount'>
              <Form.Control
                type='text'
                placeholder='Enter Number of Passenger(s)'
                value={passengerCount}
                onChange={(e) => setPassengerCount(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Category</Card.Text>
            <Form.Group className='mb-3' controlId='category'>
              <Form.Control
                className='form-select'
                as='select'
                type='select'
                placeholder='Select Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>{category}</option>
                <option value='AC'>AC</option>
                <option value='Non AC'>Non AC</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

const SearchDestinations = () => {
  const [searchDistrict, setSearchDistrict] = useState('')
  const [searchDivision, setSearchDivision] = useState('')
  const [searchCity, setSearchCity] = useState('')

  return (
    <div>
      <Card>
        <Row className='mt-3'>
          <Card.Text as='h5'>Search Destinations</Card.Text>
        </Row>
        <Row className='my-5 mx-3'>
          <Col>
            <Card.Text>Select Division</Card.Text>
            <Form.Group className='mb-3' controlId='searchDivision'>
              <Form.Control
                className='form-select'
                as='select'
                type='select'
                placeholder='Select Division'
                value={searchDivision}
                onChange={(e) => setSearchDivision(e.target.value)}
              >
                <option>{searchDivision}</option>
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

          <Col>
            <Card.Text>Enter District</Card.Text>
            <Form.Group className='mb-3' controlId='searchDistrict'>
              <Form.Control
                type='text'
                placeholder='Enter District Name'
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Enter City</Card.Text>
            <Form.Group className='mb-3' controlId='searchCity'>
              <Form.Control
                type='text'
                placeholder='Enter the City Name'
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

const SearchTours = () => {
  const [searchTourCity, setSearchTourCity] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [travelerCount, setTravelerCount] = useState('')

  const navigate = useNavigate()

  const handleTourSearch = (e) => {
    e.preventDefault()
    navigate(
      `/tourSearch?city=${searchTourCity}&travelDate=${travelDate}&travelerCount=${travelerCount}`
    )
  }

  return (
    <Card>
      <Row className='mt-3'>
        <Card.Text as='h5'>Search Holiday Packages</Card.Text>
      </Row>

      <Row className='my-5 mx-3'>
        <Col>
          <Card.Text>Enter City</Card.Text>
          <Form.Group className='mb-3' controlId='searchTourCity'>
            <Form.Control
              type='text'
              placeholder='Enter the City Name'
              value={searchTourCity}
              onChange={(e) => setSearchTourCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Travel Date</Card.Text>
          <Form.Group className='mb-3' controlId='travelDate'>
            <InputGroup>
              <div
                onClick={(e) => {
                  setTravelDate('')
                }}
                className='cancle-icon'
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '5px',
                  zIndex: '9999',
                  width: '3vh',
                }}
              ></div>
            </InputGroup>
            <Form.Control
              type='date'
              placeholder={travelDate === 'Select Check-In Date'}
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Number of Travelers</Card.Text>
          <Form.Group className='mb-3' controlId='travelerCount'>
            <Form.Control
              type='text'
              placeholder='Number of Travelers'
              value={travelerCount}
              onChange={(e) => setTravelerCount(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Button onClick={handleTourSearch}>Submit Search</Button>
    </Card>
  )
}

const Navbar = () => {
  const [searchParams] = useSearchParams()
  const [searchSelection, setSearchSelection] = useState('destinations')

  const { userInfo, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (searchParams.get('id')) {
      if (!isSuccess || !userInfo) {
        dispatch(getAuthedUser(searchParams.get('id')))
        navigate('/')
      }
      if (isError) {
        alert(message)
      }
      dispatch(resetAuth())
    }
  }, [searchParams, userInfo, isError, isSuccess, message, dispatch])

  return (
    <div
      style={{
        minHeight: '80vh',
        backgroundImage: 'url("/Nav/test2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='d-flex justify-content-center align-items-center'
    >
      <Card className='text-center w-55'>
        <Card.Header>
          <Container>
            <Row>
              <Col
                sm={6}
                lg={3}
                className='d-flex justify-content-center pb-1'
                onClick={() => setSearchSelection('destinations')}
              >
                <Button
                  style={{ width: '100%', borderRadius: '0' }}
                  variant={
                    searchSelection === 'destinations'
                      ? 'success'
                      : 'outline-success'
                  }
                >
                  Destination
                </Button>
              </Col>
              <Col
                sm={6}
                lg={3}
                className='d-flex justify-content-center pb-1'
                onClick={() => setSearchSelection('transports')}
              >
                <Button
                  style={{ width: '100%', borderRadius: '0' }}
                  variant={
                    searchSelection === 'transports'
                      ? 'success'
                      : 'outline-success'
                  }
                >
                  Transports
                </Button>
              </Col>
              <Col
                sm={6}
                lg={3}
                className='d-flex justify-content-center pb-1'
                onClick={() => setSearchSelection('stays')}
              >
                <Button
                  style={{ width: '100%', borderRadius: '0' }}
                  variant={
                    searchSelection === 'stays' ? 'success' : 'outline-success'
                  }
                >
                  Stays
                </Button>
              </Col>
              <Col
                sm={6}
                lg={3}
                className='d-flex justify-content-center pb-1'
                onClick={() => setSearchSelection('tours')}
              >
                <Button
                  style={{ width: '100%', borderRadius: '0' }}
                  variant={
                    searchSelection === 'tours' ? 'success' : 'outline-success'
                  }
                >
                  Tours
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body>
          {searchSelection === 'stays' ? (
            <SearchStays />
          ) : searchSelection === 'destinations' ? (
            <SearchDestinations />
          ) : searchSelection === 'tours' ? (
            <SearchTours />
          ) : searchSelection === 'transports' ? (
            <SearchTransports />
          ) : null}
        </Card.Body>
      </Card>
    </div>
  )
}

export default Navbar
