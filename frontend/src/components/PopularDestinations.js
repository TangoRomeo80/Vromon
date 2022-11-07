import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getTopDestinations,
  resetDestinationList,
} from "../features/destination/destinationSlice";

const PopularDestinations = () => {
  const dispatch = useDispatch();

  const [topDestinations, setTopDestinations] = useState([]);

  const {
    destinations,
    isListLoading,
    isListSuccess,
    isListError,
    listErrorMessage,
  } = useSelector((state) => state.destination);

  useEffect(() => {
    if (isListError) {
      toast.error(listErrorMessage, { position: "top-center" });
    }
    if (isListSuccess) {
      setTopDestinations(destinations);
    } else {
      dispatch(getTopDestinations());
    }
  }, [dispatch, destinations, isListSuccess, isListError, listErrorMessage]);

  useEffect(() => {
    return () => {
      dispatch(resetDestinationList());
    };
  }, [dispatch]);

  return (
    <div>
      <Container>
        <h2 className="font-weight-bold text-center mb-4">
          Popular Destinations Right Now
        </h2>
        
        <Row className="my-4">
          <Col xs={12} md={3}>
            <LinkContainer to="">
              <Card>
                <Card.Img
                  cascade
                  className="img-fluid"
                  src="/LightningDeals/test.jpg"
                />

                <Card.Body cascade>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
        </Row>

        <Row className="mb-4">
          <Button variant="info" size="sm">
            Show More
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default PopularDestinations;
