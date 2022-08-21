import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaGreaterThan } from 'react-icons/fa'

const TopAirlines = () => {
  return (
    <div>
      <Container>
        <h2 className="font-weight-bold text-center mb-4">
          Search For Top Airlines in Bangladesh
        </h2>

        <Row className="my-4">
          <Col xs={12} md={4}>
            <LinkContainer to="">
              <Card>
                <Card.Body className="d-flex flex-row justify-content-center">
                  <Card.Img
                    src="https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/BG.png"
                    alt=""
                    style={{ height: "26px", width: "26px" }}
                  /> &nbsp;
                  <Card.Title>Biman Bangladesh Airlines</Card.Title>
                  {/* <div className='justify-content-end'><FaGreaterThan/></div> */}
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
          <Col xs={12} md={4}>
            <LinkContainer to="">
              <Card>
                <Card.Body className="d-flex flex-row justify-content-center">
                  <Card.Img
                    src="https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/BS.png"
                    alt=""
                    style={{ height: "26px", width: "26px" }}
                  /> &nbsp;
                  <Card.Title>US-Bangla Airlines</Card.Title>
                  {/* <div className='justify-content-end'><FaGreaterThan/></div> */}
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
          <Col xs={12} md={4}>
            <LinkContainer to="">
              <Card>
                <Card.Body className="d-flex flex-row justify-content-center">
                  <Card.Img
                    src="https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/EK.png"
                    alt=""
                    style={{ height: "26px", width: "26px" }}
                  /> &nbsp;
                  <Card.Title>Fly Emirates</Card.Title>
                  {/* <div className='justify-content-end'><FaGreaterThan/></div> */}
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
        </Row>

        <Row className="my-4">
          <Col xs={12} md={4}>
            <LinkContainer to="">
              <Card>
                <Card.Body className="d-flex flex-row justify-content-center">
                  <Card.Img
                    src="https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/H9.png"
                    alt=""
                    style={{ height: "26px", width: "26px" }}
                  /> &nbsp;
                  <Card.Title>Himalaya Airlines</Card.Title>
                  {/* <div className='justify-content-end'><FaGreaterThan/></div> */}
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
          <Col xs={12} md={4}>
            <LinkContainer to="">
              <Card>
                <Card.Body className="d-flex flex-row justify-content-center">
                  <Card.Img
                    src="https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/SQ.png"
                    alt=""
                    style={{ height: "26px", width: "26px" }}
                  /> &nbsp;
                  <Card.Title>Singapore Airlines</Card.Title>
                  {/* <div className='justify-content-end'><FaGreaterThan/></div> */}
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
          <Col xs={12} md={4}>
            <LinkContainer to="">
              <Card>
                <Card.Body className="d-flex flex-row justify-content-center">
                  <Card.Img
                    src="https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/TK.png"
                    alt=""
                    style={{ height: "26px", width: "26px" }}
                  /> &nbsp;
                  <Card.Title>Turkish Airlines</Card.Title>
                  {/* <div className='justify-content-end'><FaGreaterThan/></div> */}
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopAirlines;
