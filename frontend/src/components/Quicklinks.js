import React from 'react'
import { Container, Row, Col, Card, Button, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Quicklinks = () => {
  return (
    <div>
      <Container>
        <Row className='mb-5 '>
          <Col xs={12} md={4}>
            <h6
              style={{ color: 'black' }}
              className='font-weight-bold text-center mb-4 my-4'
            >
              Company
            </h6>
            <Nav className='flex-column text-center'>
              <Nav.Link href='#'>About Us</Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={4}>
            <h6
              style={{ color: 'black' }}
              className='font-weight-bold text-center mb-4 my-4'
            >
              Explore
            </h6>
            <Nav className='flex-column text-center'>
              <Nav.Link href='/destinationSearch'>Destinations</Nav.Link>
              <Nav.Link href='/staysSearch'>Where to Stay</Nav.Link>
              <Nav.Link href='/transportSearch'>Relevent Transport</Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={4}>
            <h6
              style={{ color: 'black' }}
              className='font-weight-bold text-center mb-4 my-4'
            >
              Help
            </h6>
            <Nav className='flex-column text-center'>
              <Nav.Link href='/termsAndConditions'>Terms & Conditions</Nav.Link>
              {/* <Nav.Link href='#'>Support Center</Nav.Link>
              <Nav.Link href='#'>Privacy Policy</Nav.Link> */}
            </Nav>
          </Col>
          {/* <Col xs={12} md={3}>
            <h6
              style={{ color: 'black' }}
              className='font-weight-bold text-center mb-4 my-4'
            >
              Terms & Condition
            </h6>
            <Nav className='flex-column text-center'>
              <Nav.Link href='#'>General</Nav.Link>
              <Nav.Link href='#'>Offers</Nav.Link>
            </Nav>
          </Col> */}
        </Row>
      </Container>
    </div>
  )
}

export default Quicklinks
