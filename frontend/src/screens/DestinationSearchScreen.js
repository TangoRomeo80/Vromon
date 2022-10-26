import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const DestinationSearchScreen = () => {
  const [budget, setBudget] = useState(0);
  const [duration, setDuration] = useState("");
  const [placeType, setPlaceType] = useState("");
  
  return (
    <Container>
      <Row>
        {/* Left Coloumn For Filtering */}
        <Col xs={12} md={3} xl={3}>
          {/* Row For Budget */}
          <Row className="my-4">
            <Card>
              <Card.Header as="h6">Budget</Card.Header>
            </Card>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="budget">
              {/* <Form.Label className='small mb-1'>Budget</Form.Label> */}
              <Form.Control
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Row>

          {/* Row For Duration */}
          <Row className="my-4">
            <Card>
              <Card.Header as="h6">Package Duration</Card.Header>
            </Card>

            <Col className="mt-3">
              <Form.Group className="mb-3" controlId="">
                <Form.Control
                  className="form-select"
                  as="select"
                  type="select"
                  placeholder="Select Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option>{duration}</option>
                  <option value="1day">1 day</option>
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

          {/* Row for Favourite Tour Place Type */}
          <Row className="my-4">
            <Card>
              <Card.Header as="h6">Desired Place Type</Card.Header>
            </Card>

            <Col className="mt-3">
              <Form.Group className="mb-3" controlId="placeType">
                <Form.Control
                  className="form-select"
                  as="select"
                  type="select"
                  placeholder="Select Place Type"
                  value={placeType}
                  onChange={(e) => setPlaceType(e.target.value)}
                >
                  <option>{placeType}</option>
                  <option value="seaBeach">Sea Beach</option>
                  <option value="hillTracking">Hill Tracking</option>
                  <option value="hillSighting">Hill Sighting</option>
                  <option value="skiing">Skiing</option>
                  <option value="family">Family</option>
                  <option value="romantic">Romantic</option>
                  <option value="city">City</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Col>

        {/* Right Colomn For Places/Card */}

        <Col xs={12} md={9} xl={9}>
          <Row className="my-4">
            <Card.Header as='h5' className="mx-4">
              Explore Destinations
            </Card.Header>
            <Card.Text className='mx-3 mt-2'>
              From Chittagong
            </Card.Text>
          </Row>
          <Row className="my-4">
            <Col xs={12} md={4} lg={4}>
              <LinkContainer to="">
                <Card>
                  <Card.Img
                    variant="top"
                    src="/Destinations/Test.jpg"
                    style={{ height: "30vh", objectFit: "cover" }}
                  />
                  <Card.Body cascade>
                    <Row>
                      <Col lg={6} md={2} xs={6}>
                        <Card.Title as="h6">Chittagong</Card.Title>
                        <Card.Text> Bangladesh </Card.Text>
                      </Col>
                      <Col
                        lg={6}
                        md={2}
                        xs={6}
                        className="d-flex flex-column justify-content-end"
                      >
                        <Card.Title as="h6">TK: 10,000</Card.Title>
                        <Card.Text> Madafaka </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </LinkContainer>
            </Col>

            <Col xs={12} md={4} lg={4}>
              <LinkContainer to="">
                <Card>
                  <Card.Img
                    variant="top"
                    src="/Destinations/Test.jpg"
                    style={{ height: "30vh", objectFit: "cover" }}
                  />
                  <Card.Body cascade>
                    <Row>
                      <Col lg={6} md={2} xs={6}>
                        <Card.Title as="h6">Chittagong</Card.Title>
                        <Card.Text> Bangladesh </Card.Text>
                      </Col>
                      <Col
                        lg={6}
                        md={2}
                        xs={6}
                        className="d-flex flex-column justify-content-end"
                      >
                        <Card.Title as="h6">TK: 10,000</Card.Title>
                        <Card.Text> Madafaka </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </LinkContainer>
            </Col>

            <Col xs={12} md={4} lg={4}>
              <LinkContainer to="">
                <Card>
                  <Card.Img
                    variant="top"
                    src="/Destinations/Test.jpg"
                    style={{ height: "30vh", objectFit: "cover" }}
                  />
                  <Card.Body cascade>
                    <Row>
                      <Col lg={6} md={2} xs={6}>
                        <Card.Title as="h6">Chittagong</Card.Title>
                        <Card.Text> Bangladesh </Card.Text>
                      </Col>
                      <Col
                        lg={6}
                        md={2}
                        xs={6}
                        className="d-flex flex-column justify-content-end"
                      >
                        <Card.Title as="h6">TK: 10,000</Card.Title>
                        <Card.Text> Madafaka </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </LinkContainer>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DestinationSearchScreen;
