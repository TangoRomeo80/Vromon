import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";
import { IoCloudyNight } from "react-icons/io5";
import { FaCloudSun } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { BsSunsetFill } from "react-icons/bs";

const TransportSearchScreen = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <Container>
      <Row className="pt-3 mb-2">
        <Col lg={6} md={6} sm={6}>
          <Card.Text as="h3">Location From - Location To</Card.Text>
          <Card.Text>Date From - Date To | Person Count</Card.Text>
        </Col>
        <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
          <Link to="" className="btn btn-primary mb-5">
            Modify Search
          </Link>
        </Col>
      </Row>

      <Row>
        {/* Left Column */}
        <Col lg={3} md={3} sm={12}>
          <Row className="my-3">
            {/* <Link to="" className="btn btn-outline-primary">
                Reset Search
              </Link> */}
            <Button variant="outline-primary">Reset Search</Button>
          </Row>

          <Row className="my-4">
            <Card>
              <Card.Header as="h5">Price Range</Card.Header>
            </Card>

            <Col sm={6} md={6} lg={6}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label className="small mb-1">Minimum Price</Form.Label>
                <Form.Control
                  type="text"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label className="small mb-1">Maximum Price</Form.Label>
                <Form.Control
                  type="text"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="my-4">
            <Card>
              <Card.Header as="h5">Schedule</Card.Header>

              <Card.Text className="mt-2">Departure Time</Card.Text>
              <Button variant="outline-dark" className="mb-2">
                <IoCloudyNight className="mb-1" /> 12:00 AM - 6:00 AM
              </Button>
              <Button variant="outline-dark" className="mb-2">
                <FaCloudSun className="mb-1" /> 6:00 AM - 12:00 PM
              </Button>
              <Button variant="outline-dark" className="mb-2">
                <FiSun className="mb-1" /> 12:00 PM - 6:00 PM
              </Button>
              <Button variant="outline-dark" className="mb-2">
                <BsSunsetFill className="mb-1" /> 6:00 PM - 12:00 AM
              </Button>
            </Card>
          </Row>

          <Row>
            <Card>
              <Card.Header as="h5">Transport Services</Card.Header>

              <Form.Group controlId="checkTransport">
                <Form.Check type="checkbox" label="Hanif Paribahan" />
                <Form.Check type="checkbox" label="Shyamoli Paribahan" />
                <Form.Check type="checkbox" label="Ena Travels" />
                <Form.Check type="checkbox" label="Soudia Travels" />
                <Form.Check type="checkbox" label="Green Line" />
                <Form.Check type="checkbox" label="Himalaya Travels" />
                <Form.Check type="checkbox" label="Eagle Paribahan" />
                <Form.Check type="checkbox" label="Al-Baraka Transport" />
                <Form.Check type="checkbox" label="Shohag Express" />
                <Form.Check type="checkbox" label="Desh Travels" />
              </Form.Group>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TransportSearchScreen;
