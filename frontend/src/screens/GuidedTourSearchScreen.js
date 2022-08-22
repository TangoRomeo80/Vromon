import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const GuidedTourSearchScreen = () => {
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

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
          <Row>
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
            <Col sm={6} md={2} lg={6}>
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


            {/* Row For Filter Search */}
            <Row>
                <Card>
                    <Card.Header>Package Search</Card.Header>
                </Card>
            </Row>

        </Col>
      </Row>
    </Container>
  );
};

export default GuidedTourSearchScreen;
