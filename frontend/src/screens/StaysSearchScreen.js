import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";
import { MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { getAllAcomodations, resetServiceList } from "../features/service/serviceSlice";
import SearchStays from "../components/SearchStays";

const StaysSearchScreen = () => {
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [searchHotel, setSearchHotel] = useState("");

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [allAcomodations, setAllAcomodations] = useState([]);
  const [checkinDateSearch, setCheckinDateSearch] = useState(
    searchParams.get("checkinDate") || ""
  )
  const [checkoutDateSearch, setCheckoutDateSearch] = useState(
    searchParams.get("checkoutDate") || ""
  )
  const [guestCountSearch, setGuestCountSearch] = useState(
    searchParams.get("guestCount") || ""
  )
  const [roomCountSearch, setRoomCountSearch] = useState(
    searchParams.get("roomCount") || ""
  )
  const [modifySearch, setModifySearch] = useState(false);

  const {
    services,
    isListLoading,
    isListSuccess,
    isListError,
    listErrorMessage,
  } = useSelector((state) => state.service);

  return (
    <Container>
      <Row className="mb-2 pt-3">
        <Col lg={6} md={6} sm={6}>
          <Card.Text as="h3">Location Name</Card.Text>
          <Card.Text>
            Stay Search Queries (Hotels, Check-in-out-Date, Guests, Rooms)
          </Card.Text>
        </Col>
        <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
          <Link to="" className="btn btn-primary mb-5">
            Modify Search
          </Link>
        </Col>
      </Row>

      <Row>
        {/* Left Column */}
        <Col xs={12} md={3} xl={3}>
          <Row className="my-3">
            <Link to="" className="btn btn-outline-primary">
              Reset Search
            </Link>
          </Row>

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

          {/* Row For Hotel Search */}
          <Row className="my-4">
            <Card>
              <Card.Header as="h5">Search Hotels</Card.Header>
            </Card>

            <Col className="mt-3">
              <Form.Group className="mb-3" controlId="">
                <Form.Control
                  type="text"
                  placeholder="Enter Hotel Name"
                  value={searchHotel}
                  onChange={(e) => setSearchHotel(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Col>

        {/* Right Colomn/Package Images Card */}
        <Col xs={12} md={9} xl={9}>
          <Row className="my-4">
            <Card.Header as="h5" className="mx-4">
              20 Available Hotels
            </Card.Header>
            <Card.Text className="mx-3 mt-2">
              *Price is per night per room & includes VAT & Taxes
            </Card.Text>
          </Row>

          <Card className="mx-2 mb-3">
            <Row className="d-flex">
              <Col sm={4} md={3} lg={3}>
                <Card.Img
                  src="/Destinations/Test.jpg"
                  className="img-fluid rounded-start"
                  variant="top"
                  style={{ objectFit: "cover", height: "220px" }}
                />
              </Col>
              <Col sm={4} md={6} lg={6}>
                <Card.Body>
                  <Card.Title as="h5">Sayeman Hotel & Resort</Card.Title>
                  <Card.Text>
                    <MdLocationOn /> &nbsp;14 Kalatoli Hotel Motel Zone, Cox's
                    Bazar, Bangladesh
                  </Card.Text>
                  <Card.Text>*Rating Here</Card.Text>
                  <Card.Text>*Trip Coin</Card.Text>
                </Card.Body>
              </Col>

              <Col sm={4} md={3} lg={3} className="d-flex justify-content-end">
                <Card.Body>
                  <Card.Text className="my-3">Starts From</Card.Text>
                  <Card.Text>BDT Magna/Night</Card.Text>

                  <Button className="mt-4">Book Now</Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          <Card className="mx-2 mb-3">
            <Row className="d-flex">
              <Col sm={4} md={3} lg={3}>
                <Card.Img
                  src="/Destinations/Test.jpg"
                  className="img-fluid rounded-start"
                  variant="top"
                  style={{ objectFit: "cover", height: "220px" }}
                />
              </Col>
              <Col sm={4} md={6} lg={6}>
                <Card.Body>
                  <Card.Title as="h5">Sayeman Hotel & Resort</Card.Title>
                  <Card.Text>
                    <MdLocationOn /> &nbsp;14 Kalatoli Hotel Motel Zone, Cox's
                    Bazar, Bangladesh
                  </Card.Text>
                  <Card.Text>*Rating Here</Card.Text>
                  <Card.Text>*Trip Coin</Card.Text>
                </Card.Body>
              </Col>

              <Col sm={4} md={3} lg={3} className="d-flex justify-content-end">
                <Card.Body>
                  <Card.Text className="my-3">Starts From</Card.Text>
                  <Card.Text>BDT Magna/Night</Card.Text>

                  <Button className="mt-4">Book Now</Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          <Card className="mx-2 mb-3">
            <Row className="d-flex">
              <Col sm={4} md={3} lg={3}>
                <Card.Img
                  src="/Destinations/Test.jpg"
                  className="img-fluid rounded-start"
                  variant="top"
                  style={{ objectFit: "cover", height: "220px" }}
                />
              </Col>
              <Col sm={4} md={6} lg={6}>
                <Card.Body>
                  <Card.Title as="h5">Sayeman Hotel & Resort</Card.Title>
                  <Card.Text>
                    <MdLocationOn /> &nbsp;14 Kalatoli Hotel Motel Zone, Cox's
                    Bazar, Bangladesh
                  </Card.Text>
                  <Card.Text>*Rating Here</Card.Text>
                  <Card.Text>*Trip Coin</Card.Text>
                </Card.Body>
              </Col>

              <Col sm={4} md={3} lg={3} className="d-flex justify-content-end">
                <Card.Body>
                  <Card.Text className="my-3">Starts From</Card.Text>
                  <Card.Text>BDT Magna/Night</Card.Text>

                  <Button className="mt-4">Book Now</Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StaysSearchScreen;
