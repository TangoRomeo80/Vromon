import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { MdLocationOn } from "react-icons/md";

const ServiceListScreen = () => {
  return (
    <Container className="pt-5">
      <Form>
        <Row>
          {/* Left Column For Options */}
          <Col lg={3} md={12} sm={12}>
            <Card className="mb-1 shadow">
              <Card.Body>
                <Row className="my-2">
                  <Button>Transports</Button>
                </Row>
                <Row className="my-2">
                  <Button>Hotels</Button>
                </Row>
                <Row className="my-2">
                  <Button>Foods</Button>
                </Row>
                <Row className="my-2">
                  <Button>Tours</Button>
                </Row>
                <Row className="my-2">
                  <Button>Others</Button>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column For Business List */}

          <Col lg={9} md={12} sm={12}>
            <Card className="mb-1 shadow">
              <Card.Body>
                <Row className="my-2 pb-2">
                  <Col sm={4} md={3} lg={3}>
                    <Card.Img
                      src="/Destinations/Test.jpg"
                      className="img-fluid rounded-start"
                      variant="top"
                      style={{ objectFit: "cover", height: "220px" }}
                    />
                  </Col>
                  <Col sm={4} md={6} lg={6}>
                    <Card.Body>
                      <Card.Title as="h5">Sayeman Hotel & Resort</Card.Title>
                      <Card.Text>
                        <MdLocationOn /> &nbsp;14 Kalatoli Hotel Motel Zone,
                        Cox's Bazar, Bangladesh
                      </Card.Text>
                      <Card.Text>*Rating Here</Card.Text>
                      <Card.Text>*Trip Coin</Card.Text>
                    </Card.Body>
                  </Col>
                  <Col
                    sm={4}
                    md={3}
                    lg={3}
                    className="d-flex justify-content-end"
                  >
                    <Card.Body>
                      <Card.Text className="my-3">Starts From</Card.Text>
                      <Card.Text>BDT Magna/Night</Card.Text>

                      <Button className="mt-4">Book Now</Button>
                    </Card.Body>
                  </Col>
                </Row>

                <Row className="my-2 pb-2">
                  <Col sm={4} md={3} lg={3}>
                    <Card.Img
                      src="/Destinations/Test.jpg"
                      className="img-fluid rounded-start"
                      variant="top"
                      style={{ objectFit: "cover", height: "220px" }}
                    />
                  </Col>
                  <Col sm={4} md={6} lg={6}>
                    <Card.Body>
                      <Card.Title as="h5">Sayeman Hotel & Resort</Card.Title>
                      <Card.Text>
                        <MdLocationOn /> &nbsp;14 Kalatoli Hotel Motel Zone,
                        Cox's Bazar, Bangladesh
                      </Card.Text>
                      <Card.Text>*Rating Here</Card.Text>
                      <Card.Text>*Trip Coin</Card.Text>
                    </Card.Body>
                  </Col>
                  <Col
                    sm={4}
                    md={3}
                    lg={3}
                    className="d-flex justify-content-end"
                  >
                    <Card.Body>
                      <Card.Text className="my-3">Starts From</Card.Text>
                      <Card.Text>BDT Magna/Night</Card.Text>

                      <Button className="mt-4">Book Now</Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ServiceListScreen;
