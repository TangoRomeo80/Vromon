import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";

const GuidedTourSearchScreen = () => {
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [searchPackage, setSearchPackage] = useState();
  const [duration, setDuration] = useState();

  return (
    <Container>
      <Row className="my-4">
        <Col lg={6} md={6} sm={6}>
          <Card.Text as="h3">Unga Bunga</Card.Text>
          <Card.Text>Search by Destination</Card.Text>
        </Col>
        <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
          <Link to="" className="btn btn-primary">
            Modify Search
          </Link>
        </Col>
      </Row>

      {/* Search Results List */}
      <Row>
        {/* Left Colomn */}
        <Col xs={12} md={4} xl={4}>
          <Row className="my-3">
            <Link to="" className="btn btn-primary-1">
              Reset Search
            </Link>
          </Row>

          {/* Row For Price Range */}
          <Row className="my-4">
            <Card>
              <Card.Header as="h5">Price Range</Card.Header>
            </Card>

            <Col sm={6} md={3} lg={6}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label className="small mb-1">Minimum Price</Form.Label>
                <Form.Control
                  type="text"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col sm={6} md={3} lg={6}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label className="small mb-1">Maximum Price</Form.Label>
                <Form.Control
                  type="text"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>For Slider</Col>
          </Row>

          {/* Row For Package Search */}
          <Row className="my-4">
            <Card>
              <Card.Header as="h5">Package Search</Card.Header>
            </Card>

            <Col className="mt-3">
              <Form.Group className="mb-3" controlId="">
                <Form.Control
                  type="text"
                  placeholder="Search For Packages"
                  value={searchPackage}
                  onChange={(e) => setSearchPackage(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Row For Duration */}
          <Row className="my-4">
            <Card>
              <Card.Header as="h5">Package Duration</Card.Header>
            </Card>

            <Col className="mt-3">
              <Form.Group className="mb-3" controlId="">
                <Form.Control
                  as="select"
                  type="select"
                  placeholder="Select Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option>{duration}</option>
                  <option value="2days">2 days</option>
                  <option value="3days">3 days</option>
                  <option value="4days">4 days</option>
                  <option value="5days">5 days</option>
                  <option value="6days">6 days</option>
                  <option value="7days">7 days</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Col>


        {/* Right Colomn/Package Images Card */}
        <Col xs={12} md={8} xl={8}>
          
        </Col>
      </Row>
    </Container>
  );
};

export default GuidedTourSearchScreen;
