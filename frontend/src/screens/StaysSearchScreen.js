import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Card, Form } from "react-bootstrap";

const StaysSearchScreen = () => {
    const [maxPrice, setMaxPrice] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [searchHotel, setSearchHotel] = useState('')
  return (
    <Container>
      <Row className="mb-2 pt-3">
        <Col lg={6} md={6} sm={6}>
          <Card.Text as="h3">Location Name</Card.Text>
          <Card.Text>
            Stay Search Queries (Hotels, Check-in-out-Date, Guests, Rooms)
          </Card.Text>
        </Col>
        <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
          <Link to="" className="btn btn-primary mb-5">
            Modify Search
          </Link>
        </Col>
      </Row>

      <Row>
        {/* Left Column */}
        <Col xs={12} md={3} xl={3}>
          <Row className="my-3">
            <Link to="" className="btn btn-outline-primary">
              Reset Search
            </Link>
          </Row>

          <Row className='my-4'>
            <Card>
              <Card.Header as='h5'>Price Range</Card.Header>
            </Card>

            <Col sm={6} md={3} lg={6}>
              <Form.Group className='mb-3' controlId=''>
                <Form.Label className='small mb-1'>Minimum Price</Form.Label>
                <Form.Control
                  type='text'
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col sm={6} md={3} lg={6}>
              <Form.Group className='mb-3' controlId=''>
                <Form.Label className='small mb-1'>Maximum Price</Form.Label>
                <Form.Control
                  type='text'
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>For Slider</Col>
          </Row>

          {/* Row For Hotel Search */}
          <Row className='my-4'>
            <Card>
              <Card.Header as='h5'>Search Hotels</Card.Header>
            </Card>

            <Col className='mt-3'>
              <Form.Group className='mb-3' controlId=''>
                <Form.Control
                  type='text'
                  placeholder='Enter Hotel Name'
                  value={searchHotel}
                  onChange={(e) => setSearchHotel(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Col>


        {/* Right Colomn/Package Images Card */}
        <Col xs={12} md={9} xl={9}>
        <Row className="my-4">
            <Card.Header as='h5' className="mx-4">
              20 Available Hotels
            </Card.Header>
            <Card.Text className='mx-3 mt-2'>
              *Price is per night per room & includes VAT & Taxes
            </Card.Text>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default StaysSearchScreen;
