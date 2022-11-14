import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Row, Col, Container, Card, Form } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Carousel from "react-bootstrap/Carousel";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

const DestinationDetails = () => {
  return (
    <div>
      <Container className='py-3'>
        <Row className='my-2'>
          <h3 className='text-center'>Explore Beautiful (Location Name)</h3>
        </Row>
        <Row className="pt-3">
          <Col lg={4} sm={12} md={4}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/LightningDeals/test.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/LightningDeals/test.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/LightningDeals/test.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>

          <Col lg={8} sm={12} md={8}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>Place Name : Bolbo na</ListGroup.Item>
                <ListGroup.Item>Division Name : </ListGroup.Item>
                <ListGroup.Item>District Name : </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row className="pt-3">
          <Card>
            <Card.Header>Description About This Place</Card.Header>
            <Card.Body>
              <Card.Text>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32.
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default DestinationDetails;
