import React from 'react'
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Quicklinks = () => {
  return (
    <div>
      <Container>
        <h4 className="font-weight-bold text-center pt-4">
          {" "}
          Quick Links{" "}
        </h4>

        <Row>
          <Col xs={12} md={3}>
            <h6
              style={{ color: "black" }}
              className="font-weight-bold text-center mb-4 my-4"
            >
              Company
            </h6>
          </Col>
          <Col xs={12} md={3}>
            <h6
              style={{ color: "black" }}
              className="font-weight-bold text-center mb-4 my-4"
            >
              Explore
            </h6>
          </Col>
          <Col xs={12} md={3}>
            <h6
              style={{ color: "black" }}
              className="font-weight-bold text-center mb-4 my-4"
            >
              Help
            </h6>
          </Col>
          <Col xs={12} md={3}>
            <h6
              style={{ color: "black" }}
              className="font-weight-bold text-center mb-4 my-4"
            >
              Terms & Condition
            </h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Quicklinks