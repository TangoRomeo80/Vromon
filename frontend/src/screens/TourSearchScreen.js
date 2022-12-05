import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import {
  getAllServices,
  resetServiceList,
} from "../features/service/serviceSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import SearchTours from "../components/SearchTours";
import { toast } from "react-toastify";

const TourSearchScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const [searchParams] = useState(new URLSearchParams(location.search));
  const [searchParams] = useSearchParams();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchPackage, setSearchPackage] = useState("");
  const [duration, setDuration] = useState("");
  const [district, setDistrict] = useState(searchParams.get("district") || "");
  const [travelDate, setTravelDate] = useState(
    searchParams.get("travelDate") || null
  );
  const [travelerCount, setTravelerCount] = useState(
    searchParams.get("traveler") * 1 || 1
  );

  const [allTours, setAllTours] = useState([]);
  const [searchedServices, setSearchedServices] = useState([]);
  const [modifySearch, setModifySearch] = useState(false);

  const { tours, isListSuccess, isListError, isListLoading, listErrorMessage } =
    useSelector((state) => state.service);

  // console.log(district, travelDate, travelerCount);

  useEffect(() => {
    // if (!isListSuccess) {
    //   dispatch(getAllServices());
    // }
    if (isListError) {
      toast.error(listErrorMessage, { position: "top-center" });
    } else if (isListSuccess) {
      const filteredServices = tours
        .filter((service) => {
          if (district === "") {
            return service;
          } else if (
            service.destination.district.toLowerCase().includes(district.toLowerCase())
          ) {
            return service;
          }
        })
        .filter((service) => {
          if (travelDate === null) {
            return service;
          } else if (new Date(service.tourInfo.travelDate)
            .toISOString()
            .split("T")[0] === travelDate) {
            return service;
          }
        })
        .filter((service) => {
          if (travelerCount === "") {
            return service;
          } else if (service.tourInfo.maxGroupSize >= travelerCount) {
            return service;
          }
        });

      // .filter((service) => {
      //   if (minPrice === 0 && maxPrice === 0) {
      //     return service;
      //   } else if (service.price >= minPrice && service.price <= maxPrice) {
      //     return service;
      //   }
      // });
      setAllTours(filteredServices);
    } else {
      // dispatch(getAllServices());
      const searched = tours.filter((service) => {
        return (
          service.serviceType === "tours" &&
          service.destination.district === district
        );
      });
      setSearchedServices(searched);
    }
  }, [tours, travelDate, travelerCount, district, isListSuccess, isListError, listErrorMessage, dispatch]);

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
            {!district && !travelDate && !travelerCount
              ? "Find Your Desired Tour Package"
              : `Tour Package Queries (District : ${district}, Travel Date : ${travelDate}, Traveler Count : ${travelerCount})`}
          </Card.Text>
        </Col>
        <Col lg={3} md={3} sm={6} className="d-flex justify-content-end">
          <Button onClick={() => setModifySearch(!modifySearch)}>
            {modifySearch ? "Cancel Search" : "Modify Search"}
          </Button>
        </Col>
      </Row>

      <Row className="my-4">{modifySearch && <SearchTours />}</Row>

      {/* Search Results List */}
      <Row>
        {/* Left Colomn */}
        <Col sm={12} md={3} lg={3}>
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

              <Row className="mt-5">
                <Card.Header as="h5">Package Duration</Card.Header>

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
            </Card.Body>
          </Card>

          {/* Row For Price Range */}

          {/* Row For Package Search */}
          {/* <Row className="my-4">
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
          </Row> */}

          {/* Row For Duration */}
        </Col>

        {/* Right Colomn/Package Images Card */}
        <Col sm={12} md={9} lg={9}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title as="h5">Explore Best Tour Packages</Card.Title>
              <Card.Text>*Get The Best Package Deals With Vromon</Card.Text>

              {isListLoading ? (
                <Loader />
              ) : allTours.length <= 0 ? (
                <Message variant="danger">
                  No Tour Packages Found. Try To Modify Search Queries With
                  Different Package.
                </Message>
              ) : (
                <>
                  {allTours.map((tour) => (
                    <Card className="shadow my-2">
                      <Card.Body>
                        <Row>
                          <Col lg={3} md={3} sm={12}>
                            <Image
                              src={tour.coverImg}
                              alt={tour.serviceName}
                              fluid
                            />
                          </Col>
                          <Col lg={5} md={5} sm={12}>
                            <Card.Title as="h5">
                              {tour.tourInfo.name}
                            </Card.Title>
                            {/* <Card.Text>
                              <strong>Bus Type: </strong>
                              {transport.transportInfo.busType}
                            </Card.Text>
                            <Card.Text>
                              <strong>Start from: </strong>
                              {transport.transportInfo.departFrom}
                            </Card.Text> */}
                            <Card.Text>
                              <strong>District: </strong>
                              {tour.destination.district === district
                                ? district
                                : "No Tour Packages Found in That District"}
                            </Card.Text>
                            <Card.Text>
                              <strong>Max Travelers Count</strong>
                              {tour.tourInfo.maxGroupSize}
                            </Card.Text>
                          </Col>
                          <Col lg={4} md={4} sm={12}>
                            <Card.Text>
                              <strong>Travel Date</strong>
                              {Moment(tour.tourInfo.travelDate).format(
                                "DD-MM-YYYY"
                              )}
                            </Card.Text>
                            <Card.Text>
                              <strong>Lead Tour Guide</strong>
                              {tour.tourInfo.leadGuideName}
                            </Card.Text>
                            <Card.Text style={{ color: "red" }}>
                              <strong>Price: </strong>
                              BDT {tour.price}
                            </Card.Text>
                          </Col>
                        </Row>
                        <Link to={`#`} className="btn btn-primary btn-success">
                          Book Now
                        </Link>
                      </Card.Body>
                    </Card>
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

export default TourSearchScreen;
