import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Card, Button, Nav, Form, InputGroup } from 'react-bootstrap'
import Moment from 'moment'

const SearchStays = () => {
  return (
    <div>
      <h1>Search Stays</h1>
    </div>
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
        <Row>
          <Card.Header as = 'h5'>Search Transports</Card.Header>
        </Row>
        <Row className='my-5 mx-3'>
          <Col>
            <Card.Text>Depart From</Card.Text>
            <Form.Group className="mb-3" controlId="departFrom">
                <Form.Control
                  type="text"
                  placeholder="Depart From"
                  value={departFrom}
                  onChange={(e) => setDepartFrom(e.target.value)}
                ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Depart To</Card.Text>
            <Form.Group className="mb-3" controlId="departTo">
                <Form.Control
                  type="text"
                  placeholder="Depart To"
                  value={departTo}
                  onChange={(e) => setDepartTo(e.target.value)}
                ></Form.Control>
            </Form.Group>
          </Col>

          <Col style={{width:'15px'}}>
            <Card.Text>Depart On</Card.Text>
            <Form.Group className="mb-3" controlId="departOn">
              <InputGroup>
                <div
                  onClick={(e) => {
                    setDepartOn("");
                  }}
                  className="cancle-icon"
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                    zIndex: "9999",
                    width: "3vh",
                  }}
                >
                </div>
              </InputGroup>
              <Form.Control
                type="date"
                value={departOn}
                onChange={(e) => setDepartOn(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Return On</Card.Text>
            <Form.Group className="mb-3" controlId="returnOn">
              <InputGroup>
                <div
                  onClick={(e) => {
                    setReturnOn("");
                  }}
                  className="cancle-icon"
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                    zIndex: "9999",
                    width: "3vh",
                  }}
                >
                </div>
              </InputGroup>
              <Form.Control
                type="date"
                value={returnOn}
                onChange={(e) => setReturnOn(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Passengers</Card.Text>
            <Form.Group className="mb-3" controlId="passengerCount">
                <Form.Control
                  type="text"
                  placeholder="Enter Number of Passenger(s)"
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(e.target.value)}
                ></Form.Control>
              </Form.Group>
          </Col>

          <Col>
            <Card.Text>Category</Card.Text>
            <Form.Group className="mb-3" controlId="category">
                <Form.Control className='form-select'
                  as="select"
                  type="select"
                  placeholder="Select Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>{category}</option>
                  <option value="AC">AC</option>
                  <option value="Non AC">Non AC</option>
                </Form.Control>
              </Form.Group>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

const SearchDestinations = () => {
  const [searchCity, setSearchCity] = useState('')
  const [checkinDate, setCheckinDate] = useState('')
  const [checkoutDate, setCheckoutDate] = useState('')
  const [guestCount, setGuestCount] = useState('')
  const [roomCount, setRoomCount] = useState('')

  return (
    <div>
      <Card>
        <Row>
          <Card.Header as='h5'>Search Destinations</Card.Header>
        </Row>
        <Row className='my-5 mx-3'>
          <Col>
            <Card.Text>Enter City</Card.Text>
            <Form.Group className="mb-3" controlId="searchCity">
                <Form.Control
                  type="text"
                  placeholder="Search For City"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Check-In Date</Card.Text>
            <Form.Group className="mb-3" controlId="checkinDate">
              <InputGroup>
                <div
                  onClick={(e) => {
                    setCheckinDate("");
                  }}
                  className="cancle-icon"
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                    zIndex: "9999",
                    width: "3vh",
                  }}
                >
                </div>
              </InputGroup>
              <Form.Control
                type="date"
                placeholder={
                  checkinDate ===
                  "Select Check-In Date"
                }
                value={checkinDate}
                onChange={(e) => setCheckinDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Check-Out Date</Card.Text>
            <Form.Group className="mb-3" controlId="checkoutDate">
              <InputGroup>
                <div
                  onClick={(e) => {
                    setCheckoutDate("");
                  }}
                  className="cancle-icon"
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                    zIndex: "9999",
                    width: "3vh",
                  }}
                >
                </div>
              </InputGroup>
              <Form.Control
                type="date"
                placeholder={
                  checkoutDate ===
                  "Select Check-Out Date"
                }
                value={checkoutDate}
                onChange={(e) => setCheckoutDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Guests</Card.Text>
            <Form.Group className="mb-3" controlId="guestCount">
                <Form.Control
                  type="text"
                  placeholder="Enter Number of Guest(s)"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                ></Form.Control>
              </Form.Group>
          </Col>

          <Col>
            <Card.Text>Rooms</Card.Text>
            <Form.Group className="mb-3" controlId="roomCount">
                <Form.Control
                  type="text"
                  placeholder="Enter Number of Room(s)"
                  value={roomCount}
                  onChange={(e) => setRoomCount(e.target.value)}
                ></Form.Control>
              </Form.Group>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

const SearchTours = () => {
  return (
    <div>
      <h1>Search Tours</h1>
    </div>
  )
}

const TestNavbar = () => {
  const [searchSelection, setSearchSelection] = useState('destinations')

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
                className='d-flex justify-content-center'
                onClick={() => setSearchSelection('destinations')}
              >
                <Button
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
                className='d-flex justify-content-center'
                onClick={() => setSearchSelection('transports')}
              >
                <Button
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
                className='d-flex justify-content-center'
                onClick={() => setSearchSelection('stays')}
              >
                <Button
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
                className='d-flex justify-content-center'
                onClick={() => setSearchSelection('tours')}
              >
                <Button
                  variant={
                    searchSelection === 'tours' ? 'success' : 'outline-success'
                  }
                >
                  Tours
                </Button>
              </Col>
            </Row>
          </Container>
          {/* <Nav>
            <Nav.Item onClick={() => setSearchSelection('destinations')}>
              <Button
                variant={
                  searchSelection === 'destinations'
                    ? 'success'
                    : 'outline-success'
                }
              >
                Destination
              </Button>
            </Nav.Item>
            <Nav.Item onClick={() => setSearchSelection('transports')}>
              <Button
                variant={
                  searchSelection === 'transports'
                    ? 'success'
                    : 'outline-success'
                }
              >
                Transports
              </Button>
            </Nav.Item>
            <Nav.Item onClick={() => setSearchSelection('stays')}>
              <Button
                variant={
                  searchSelection === 'stays' ? 'success' : 'outline-success'
                }
              >
                Stays
              </Button>
            </Nav.Item>
            <Nav.Item onClick={() => setSearchSelection('tours')}>
              <Button
                variant={
                  searchSelection === 'tours' ? 'success' : 'outline-success'
                }
              >
                Tours
              </Button>
            </Nav.Item>
          </Nav> */}
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

      {/* <Card>
        {/* <Card.Img variant="top" src="/Nav/test2.jpg" /> 

        <Card.Body>
          <Card.Header>
            {searchSelection === "stays" ? (
              <SearchStays />
            ) : searchSelection === "destinations" ? (
              <SearchDestinations />
            ) : searchSelection === "tours" ? (
              <SearchTours />
            ) : searchSelection === "transports" ? (
              <SearchTransports />
            ) : null}
          </Card.Header>
        </Card.Body>
      </Card> */}
    </div>
  )
}

export default TestNavbar
