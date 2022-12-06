import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";
import { MdLocationOn } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import {
  getAllAcomodations,
  resetServiceList,
} from "../features/service/serviceSlice";
import SearchStays from "../components/SearchStays";

const StaysSearchScreen = () => {
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [searchHotel, setSearchHotel] = useState("");

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [allAccomodations, setAllAccomodations] = useState([]);
  const [checkinDateSearch, setCheckinDateSearch] = useState(
    searchParams.get("checkinDate") || null
  );
  const [checkoutDateSearch, setCheckoutDateSearch] = useState(
    searchParams.get("checkoutDate") || null
  );
  const [guestCountSearch, setGuestCountSearch] = useState(
    searchParams.get("guestCount") * 1 || 1
  );
  const [roomCountSearch, setRoomCountSearch] = useState(
    searchParams.get("roomCount") * 1 || 1
  );
  const [modifySearch, setModifySearch] = useState(false);

  const {
    accomodations,
    isListLoading,
    isListSuccess,
    isListError,
    listErrorMessage,
  } = useSelector((state) => state.service);

  useEffect(() => {
    if (isListError) {
      toast.error(listErrorMessage, { position: "top-center" });
    } else if (isListSuccess) {
      const filteredServices = accomodations
        .filter((service) => {
          if (checkinDateSearch === null) {
            return service;
          } else if (
            new Date(service.accomodationInfo.checkinDate)
              .toISOString()
              .split("T")[0] === checkinDateSearch
          ) {
            return service;
          }
        })
        .filter((service) => {
          if (checkoutDateSearch === null) {
            return service;
          } else if (
            new Date(service.accomodationInfo.checkoutDate)
              .toISOString()
              .split("T")[0] === checkoutDateSearch
          ) {
            return service;
          }
        })
        .filter((service) => {
          if (guestCountSearch === 0) {
            return service;
          } else if (service.accomodationInfo.maxGuests >= guestCountSearch) {
            return service;
          }
        })
        .filter((service) => {
          if (roomCountSearch === 0) {
            return service;
          } else if (service.accomodationInfo.rooms >= roomCountSearch) {
            return service;
          }
        });
      setAllAccomodations(filteredServices);
    } else {
      dispatch(getAllAcomodations());
    }
  }, [
    dispatch,
    checkinDateSearch,
    checkoutDateSearch,
    guestCountSearch,
    roomCountSearch,
    isListError,
    isListSuccess,
    accomodations,
    listErrorMessage,
  ]);

  useEffect(() => {
    return () => {
      dispatch(resetServiceList());
    };
  }, [dispatch]);

  return (
    <Container>
      <Row className="mb-2 pt-3">
        <Col lg={8} md={8} sm={6}>
          <Card.Text as="h3">Location Name</Card.Text>
          <Card.Text>
            {checkinDateSearch === null &&
            checkoutDateSearch === null &&
            guestCountSearch === 1 &&
            roomCountSearch === 1
              ? "Find Your Desired Accomodations or Hotels"
              : `Search Queries (Check In Date : ${checkinDateSearch}, Check Out Date : ${checkoutDateSearch}, Guest(s) : ${guestCountSearch}, Room(s) : ${roomCountSearch})`}
          </Card.Text>
        </Col>
        <Col lg={3} md={3} sm={6} className="d-flex justify-content-end">
          <Button onClick={() => setModifySearch(!modifySearch)}>
            {modifySearch ? "Cancel Search" : "Modify Search"}
          </Button>
        </Col>
      </Row>

      <Row className="my-3">{modifySearch && <SearchStays />}</Row>

      <Row>
        {/* Left Column */}
        <Col xs={12} md={3} xl={3}>
          <Row className="my-3">
            <Link to="" className="btn btn-outline-primary">
              Reset Search
            </Link>
          </Row>

          <Card className="shadow">
            <Card.Body>
              <Row className="">
                <Card.Header as="h5">Price Range</Card.Header>

                <Col sm={6} md={3} lg={6}>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label className="small mb-1">
                      Minimum Price
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={6} md={3} lg={6}>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label className="small mb-1">
                      Maximum Price
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>For Slider</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Colomn/Package Images Card */}
        <Col xs={12} md={9} xl={9}>
          <Card className="shadow">
            <Card.Body>
              <Row className="my-2">
                <Card.Title as="h5" className="mx-3">
                  Available Hotels
                </Card.Title>
                <Card.Text className="mx-3">
                  *Price is per night per room & includes VAT & Taxes
                </Card.Text>
              </Row>

              {isListLoading ? (
                <Loader />
              ) : allAccomodations.length <= 0 ? (
                <Message variant="danger">
                  No Hotels or Accomodations Found. Please Modify Search
                  Queries!
                </Message>
              ) : (
                <>
                  {allAccomodations.map((accomodation) => (
                    <LinkContainer to="">
                      <Card className="my-2 shadow" key={accomodation._id}>
                        <Row className="d-flex">
                          <Col sm={4} md={3} lg={3}>
                            <Card.Img
                              src={accomodation.coverImg}
                              className="img-fluid rounded-start"
                              variant="top"
                              style={{ objectFit: "cover", height: "100%" }}
                            />
                          </Col>
                          <Col sm={4} md={6} lg={6}>
                            <Card.Body>
                              <Card.Title as="h5">
                                {accomodation.serviceName}
                              </Card.Title>
                              <Card.Text>
                                <MdLocationOn /> &nbsp;
                                {`${accomodation.accomodationInfo.address.house}, ${accomodation.accomodationInfo.address.street}, ${accomodation.accomodationInfo.address.area}, ${accomodation.accomodationInfo.address.city}, `}
                                Bangladesh
                              </Card.Text>
                              <Card.Text>
                                <strong>Rooms Available : </strong>
                                {accomodation.accomodationInfo.rooms}
                              </Card.Text>
                              <Card.Text>
                                <strong>Max Guests : </strong>
                                {accomodation.accomodationInfo.maxGuests}
                              </Card.Text>
                              <Card.Text>*Rating Here</Card.Text>
                            </Card.Body>
                          </Col>

                          <Col
                            sm={4}
                            md={3}
                            lg={3}
                            className="d-flex justify-content-end"
                          >
                            <Card.Body>
                              <Card.Text className="my-3">
                                <strong>Cost : </strong>BDT {accomodation.price}
                                <TbCurrencyTaka className="mb-1" />
                              </Card.Text>
                              <Card.Text>
                                <strong>
                                  **Discount Price Here (If Available)
                                </strong>
                              </Card.Text>

                              <LinkContainer to="/staysBooking">
                                <Button className="mt-4">Book Now</Button>
                              </LinkContainer>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    </LinkContainer>
                  ))}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StaysSearchScreen;
