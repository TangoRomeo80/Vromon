import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Row, Col, Container, Card, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getAllDestinations,
  resetDestinationList,
} from "../features/destination/destinationSlice";

const DestinationScreen = () => {
  const dispatch = useDispatch();

  const [allDestinations, setAllDestinations] = useState([]);

  const [divisionSearch, setDivisionSearch] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

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
      setAllDestinations(destinations);
    } else {
      dispatch(getAllDestinations());
    }
  }, [dispatch, destinations, isListSuccess, isListError, listErrorMessage]);

  useEffect(() => {
    return () => {
      dispatch(resetDestinationList());
    };
  }, [dispatch]);

  return (
    <div>
      <Container className="mb-3 pt-5">
        <Card className="mb-3 pt-5">
          <Row>
            <Card.Text as="h5" className="font-weight-bolder text-center">
              Search Destinations
            </Card.Text>
          </Row>
          <Row className="my-5 mx-3">
            <Col>
              <Card.Text>Select Division</Card.Text>
              <Form.Group className="mb-3" controlId="searchDivision">
                <Form.Control
                  className="form-select"
                  as="select"
                  type="select"
                  onChange={(e) => setDivisionSearch(e.target.value)}
                  placeholder="Select Division"
                >
                  <option value="">{divisionSearch}</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Card.Text>Enter District</Card.Text>
              <Form.Group className="mb-3" controlId="searchDistrict">
                <Form.Control
                  type="text"
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  placeholder="Enter District Name"
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Card.Text>Enter City</Card.Text>
              <Form.Group className="mb-3" controlId="searchCity">
                <Form.Control
                  type="text"
                  onChange={(e) => setCitySearch(e.target.value)}
                  placeholder="Enter the City Name"
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Card>

        <h2 className="font-weight-bold text-center mb-4">
          Popular Destinations
        </h2>

        {isListLoading ? (
          <Loader />
        ) : isListError ? (
          <Message variant="danger">{isListError}</Message>
        ) : (
          <Row className="my-4">
            {destinations
              .filter((destination) => {
                if (
                  divisionSearch === "" &&
                  districtSearch === "" &&
                  citySearch === ""
                ) {
                  return destination;
                }
              
              })

              .map((destination) => (
                <Col xs={12} md={3}>
                  <LinkContainer to="">
                    <Card key={destination._id} className="mb-2">
                      <Card.Img
                        cascade
                        className="img-fluid"
                        src="/LightningDeals/test.jpg"
                      />

                      <Card.Body cascade>
                        <Card.Title>{destination.name}</Card.Title>
                        <Card.Text>
                          <MdLocationOn /> {destination.district},{" "}
                          {destination.division}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </LinkContainer>
                </Col>
              ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default DestinationScreen;
