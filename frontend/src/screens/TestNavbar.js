import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Card, Button, Nav } from 'react-bootstrap'

const SearchStays = () => {
  return (
    <div>
      <h1>Search Stays</h1>
    </div>
  )
}

const SearchTransports = () => {
  return (
    <div>
      <h1>Search Transports</h1>
    </div>
  )
}

const SearchDestinations = () => {
  return (
    <div>
      <Card>
        <Row>
          <Card.Header as='h5'>Search Destinations</Card.Header>
        </Row>
        <Row className='my-5'>
          <Col>
            <Card.Text>Enter City</Card.Text>
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
      <Card className='text-center w-50'>
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
