import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../features/service/serviceSlice";

const TourSearchScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchPackage, setSearchPackage] = useState("");
  const [duration, setDuration] = useState("");
  const [city, setCity] = useState(
    location.state ? location.state.searchTourCity : ""
  );
  const [travelDate, setTravelDate] = useState(
    location.state ? location.state.travelDate : ""
  );
  const [travelerCount, setTravelerCount] = useState(
    location.state ? location.state.travelerCount : ""
  );
  const [searchedServices, setSearchedServices] = useState([]);

  const {
    services,
    isListSuccess,
    isListError,
    isListLoading,
    listErrorMessage,
  } = useSelector((state) => state.service);

  console.log(city, travelDate, travelerCount);

  useEffect(() => {
    if (!isListSuccess) {
      dispatch(getAllServices());
    }
    if (isListError) {
      alert(listErrorMessage);
    }
    const searched = services.filter((service) => {
      return (
        service.serviceType === "tours" && service.destination.district === city
      );
    });
    setSearchedServices(searched);
  }, [services, isListSuccess, isListError, dispatch]);

  return (
    <Container>
      <Row className="mb-2 pt-3">
        <Col lg={6} md={6} sm={6}>
          <Card.Text as="h3">Unga Bunga</Card.Text>
          <Card.Text>Search by Destination</Card.Text>
        </Col>
        <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
          <Link to="#" className="btn btn-primary mb-5">
            Modify Search
          </Link>
        </Col>
      </Row>

      {/* Search Results List */}
      <Row>
        {/* Left Colomn */}
        <Col sm={12} md={4} xl={4}>
          <Row className="my-3">
            <Link to="" className="btn btn-outline-primary">
              Reset Search
            </Link>
          </Row>

          {/* Row For Price Range */}
          <Row className="my-4">
            <Card>
              <Card.Header as="h5">Price Range</Card.Header>
            </Card>

            <Col sm={6} md={3} lg={6}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label className="small mb-1">Minimum Price</Form.Label>
                <Form.Control
                  type="text"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col sm={6} md={3} lg={6}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label className="small mb-1">Maximum Price</Form.Label>
                <Form.Control
                  type="text"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>For Slider</Col>
          </Row>

          {/* Row For Package Search */}
          <Row className="my-4">
            <Card>
              <Card.Header as="h5">Package Search</Card.Header>
            </Card>

            <Col className="mt-3">
              <Form.Group className="mb-3" controlId="">
                <Form.Control
                  type="text"
                  placeholder="Search For Packages"
                  value={searchPackage}
                  onChange={(e) => setSearchPackage(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Row For Duration */}
          <Row className="my-4">
            <Card>
              <Card.Header as="h5">Package Duration</Card.Header>
            </Card>

            <Col className="mt-3">
              <Form.Group className="mb-3" controlId="">
                <Form.Control
                  className="form-select"
                  as="select"
                  type="select"
                  placeholder="Select Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option>{duration}</option>
                  <option value="2days">2 days</option>
                  <option value="3days">3 days</option>
                  <option value="4days">4 days</option>
                  <option value="5days">5 days</option>
                  <option value="6days">6 days</option>
                  <option value="7days">7 days</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Col>

        {/* Right Colomn/Package Images Card */}
        <Col sm={12} md={8} xl={8}>
          <Row className="my-2">
            <Card.Header as="h5" className="mx-4">
              Explore Best Places
            </Card.Header>
            <Card.Text className="mx-3 mt-2">
              *Get The Best Package Deals With Us
            </Card.Text>
          </Row>

          <Row className="my-4">
            <Col sm={12} md={4} lg={4}>
              <LinkContainer to="" style={{ border: "1px solid black", width: "300px" }}>
                <Card className="mb-2">
                  <Card.Img
                    cascade
                    className="img-fluid"
                    src="/Destinations/Test.jpg"
                    style={{ width: "300px", height: "300px" }}
                  />

                  <Card.Body cascade>
                    <Card.Title>bolbo na</Card.Title>
                    <Card.Text>
                      <MdLocationOn /> dsitrict, division
                    </Card.Text>
                  </Card.Body>
                </Card>
              </LinkContainer>
            </Col>

            {/* <Col xs={12} md={6} lg={6}>
              <LinkContainer to=''>
                <Card>
                  <Card.Img
                    variant='top'
                    src='/Destinations/Test.jpg'
                    style={{ height: '40vh', objectFit: 'cover' }}
                  />
                  <Card.ImgOverlay className='d-flex flex-column justify-content-end'>
                    <Card.Title>Fly, Baby! Fly!</Card.Title>
                    <Card.Text className='text-light'>
                      <MdDateRange /> &nbsp;4 day <br />
                      <MdLocationOn /> &nbsp;Kathmundu, Nepal
                    </Card.Text>
                    <Card.Text style={{ fontWeight: 'bold', color: 'white' }}>
                      BDT 15,500/Person
                    </Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </LinkContainer>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TourSearchScreen;
