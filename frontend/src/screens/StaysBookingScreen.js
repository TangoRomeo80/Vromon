import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const StaysBookingScreen = () => {
  return (
    <Container className="pt-4">
      {/* Header Card */}
      <Card className="mb-2">
        <Card.Body>
          <Row>
            <h3 className="text-center">Hotel Name</h3>
          </Row>
        </Card.Body>
      </Card>

      {/* Booking Card */}
      <Form>
        <Row>
          {/* Left Column For Personal Information */}
          <Col lg={8} md={6} sm={12}>
            <Card>
              <Card.Header as="h5" className="my-2">
                Booking Information
              </Card.Header>
              <Card.Text className='small mx-3 mt-2'>
                * Please enter the contact details of the person who would like to
                receive the confirmation and be contacted if required.
              </Card.Text>
              <Card.Body>
                <Row>
                  <Col lg={6} md={12} sm={12}>
                    <Form.Group className="mb-3" controlId="bookingName">
                      <Form.Label className="">Booking Name</Form.Label>
                      <Form.Control
                        type="text"
                        className="shadow"
                        placeholder="Please Enter Your Name"
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={12} sm={12}>
                    <Form.Group className="mb-3" controlId="guestCounts">
                      <Form.Label className="">Guest Counts</Form.Label>
                      <Form.Control
                        type="text"
                        className="shadow"
                        placeholder="Please Enter Number of Guest(s)"
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={12} sm={12}>
                    <Form.Group className="mb-3" controlId="bookingName">
                      <Form.Label className="">Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        className="shadow"
                        placeholder="Please Enter Your Contact Number"
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={12} sm={12}>
                    <Form.Group className="mb-3" controlId="bookingName">
                      <Form.Label className="">Remarks</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        className="shadow"
                        placeholder="Please write if you have any remarks regarding your booking"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='my-2'>
                    <LinkContainer to='#'>
                        <Button>Confirm Booking</Button>
                    </LinkContainer>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default StaysBookingScreen;
