import React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Carousel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const StayDetailsTourist = () => {
  return (
    <Container className="pt-4">
      <Row className="pb-4">
        <Card.Text as="h2" className="font-weight-bolder text-center">
          Details Information of (Name)
        </Card.Text>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Img
              cascade
              className="img-fluid"
              src="/uploads/stays-2.jpg"
              style={{ maxHeight: "45vh" }}
            />
          </Card>
        </Col>
      </Row>

      <h3 className="my-4 d-flex justify-content-center">
        Detailed Information
      </h3>

      <Row>
        <Col lg={6} md={6} sm={12}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/destinations/test.jpg"
                alt="Destination Images"
                style={{ maxHeight: "45vh", objectFit: "cover" }}
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col lg={6} md={6} sm={12}>
          <Card>
            <Card.Header as="h3" className="text-center">
              Information About (Name)
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Hotel Name</strong>
              </Card.Text>
              <Card.Text>
                <strong>Location</strong>
              </Card.Text>
              <Card.Text>
                <strong>Rooms Available : </strong>
              </Card.Text>
              <Card.Text>
                <strong>Max Guests (Per Room) : </strong>
              </Card.Text>
              <Card.Text>
                <strong>Cost (Per Room) : </strong>
              </Card.Text>
              <Card.Text>
                <strong>Discount : %</strong>
              </Card.Text>
              <Card.Text>
                <strong>Rating : </strong>
              </Card.Text>
              <Link to="" className="btn btn-primary">
                  Write a Review
                </Link>
                <Link to="" className="btn btn-primary">
                  Check All Reviews
                </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StayDetailsTourist;
