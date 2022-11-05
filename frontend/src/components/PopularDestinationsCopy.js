import React from 'react'
import { motion } from 'framer-motion'
import { Row, Col, Container, Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { MdDateRange, MdLocationOn } from 'react-icons/md'

const PopularDestinations = () => {
  return (
    <div>
      <Container>
        <h2 className='font-weight-bold text-center mb-4'>
          Popular Destinations
        </h2>

        <Row className='my-4'>
          <Col xs={12} md={12} lg={12}>
            <LinkContainer to=''>
              <Card>
                <Card.Img
                  variant='top'
                  src='/LightningDeals/test.jpg'
                  style={{ height: '40vh', objectFit: 'cover' }}
                />
                <Card.ImgOverlay className='d-flex flex-column justify-content-end'>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text className='text-light'>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: 'bold', color: 'white' }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </LinkContainer>
          </Col>
        </Row>

        <Row className='my-4'>
          <Col xs={12} md={3}>
            <LinkContainer to=''>
              <Card>
                <Card.Img
                  cascade
                  className='img-fluid'
                  src='/LightningDeals/test.jpg'
                />

                <Card.Body cascade>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: 'bold' }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>

          <Col xs={12} md={3}>
            <LinkContainer to=''>
              <Card>
                <Card.Img
                  cascade
                  className='img-fluid'
                  src='/LightningDeals/test.jpg'
                />

                <Card.Body cascade>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: 'bold' }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>

          <Col xs={12} md={3}>
            <LinkContainer to=''>
              <Card>
                <Card.Img
                  cascade
                  className='img-fluid'
                  src='/LightningDeals/test.jpg'
                />

                <Card.Body cascade>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: 'bold' }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>

          <Col xs={12} md={3}>
            <LinkContainer to=''>
              <Card>
                <Card.Img
                  cascade
                  className='img-fluid'
                  src='/LightningDeals/test.jpg'
                />

                <Card.Body cascade>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: 'bold' }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
        </Row>

        <Row className='mb-4'>
          <Button variant='info' size='sm'>
            Show More
          </Button>
        </Row>
      </Container>
    </div>
  )
}

export default PopularDestinations