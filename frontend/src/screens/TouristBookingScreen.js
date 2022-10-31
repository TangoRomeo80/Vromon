import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const touristBookingScreen = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col lg={3} md={12} sm={12}>
          <Card className='shadow'>
            <Card.Body>
              <Row className="mb-3">
                <Button>Transport Bookings</Button>
              </Row>

              <Row className="mb-3">
                <Button>Stay Bookings</Button>
              </Row>

              <Row className="mb-3">
                <Button>Tour Bookings</Button>
              </Row>

              <Row >
                <Button>Other Bookings</Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* <Col lg={9} md={12} sm={12}>
            <Card className='shadow'>
                <Card.Body>

                </Card.Body>
            </Card>
        </Col> */}
      </Row>
    </Container>
  );
};

export default touristBookingScreen;
