import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";

const TransportSearchScreen = () => {
  return (
    <Container>
      <Row className='pt-3 mb-2'>
        <Col lg={6} md={6} sm={6}>
          <Card.Text as="h3">Location From - Location To</Card.Text>
          <Card.Text>
            Date From - Date To | Person Count
          </Card.Text>
        </Col>
        <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
          <Link to="" className="btn btn-primary mb-5">
            Modify Search
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default TransportSearchScreen;
