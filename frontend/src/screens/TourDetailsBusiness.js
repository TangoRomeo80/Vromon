import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Carousel,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getTourById,
  updateService,
  deleteService,
  resetServiceDetails,
  resetServiceUpdate,
  resetServiceDelete,
} from "../features/service/serviceSlice";
import {
  getAllDestinations,
  resetDestinationList,
} from "../features/destination/destinationSlice";
import {
  getAllBusinesses,
  resetBusinessList,
} from "../features/business/businessSlice";
import Moment from "moment";
import Message from "../components/Message";
import Loader from "../components/Loader";

const TourDetailsBusiness = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    tour,
    isDetailsLoading,
    isDetailsError,
    isDetailsSuccess,
    detailsErrorMessage,
    isUpdateLoading,
    isUpdateError,
    isUpdateSuccess,
    updateErrorMessage,
    isDeleteLoading,
    isDeleteError,
    isDeleteSuccess,
    deleteErrorMessage,
  } = useSelector((state) => state.service);

  const {
    destinations,
    isListLoading: isDestinationListLoading,
    isListError: isDestinationListError,
    isListSuccess: isDestinationListSuccess,
    listErrorMessage: destinationListErrorMessage,
  } = useSelector((state) => state.destination);

  const {
    businesses,
    isListLoading: isBusinessListLoading,
    isListError: isBusinessListError,
    isListSuccess: isBusinessListSuccess,
    listErrorMessage: businessListErrorMessage,
  } = useSelector((state) => state.business);

  const [coverImg, setCoverImg] = useState("");
  const [images, setImages] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationDetails, setDestinationDetails] = useState({});
  const [business, setBusiness] = useState("");
  const [detailedBusiness, setDetailedBusiness] = useState({});
  const [ownedBusinesses, setOwnedBusiness] = useState([]);
  const [serviceMobileNumber, setServiceMobileNumber] = useState("");

  const [tourName, setTourName] = useState("");
  const [duration, setDuration] = useState(0);
  const [travelDate, setTravelDate] = useState(null);
  const [maxGroupSize, setMaxGroupSize] = useState(0);
  const [startLocation, setStartLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [leadGuideName, setLeadGuideName] = useState("");
  const [guideNames, setGuideNames] = useState([]);
  const [leadGuideNid, setLeadGuideNid] = useState("");
  const [leadGuideContact, setLeadGuideContact] = useState("");

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: "top-center" });
    } else if (isDetailsSuccess) {
      setCoverImg(tour.coverImg);
      setImages(tour.images);
      setServiceName(tour.serviceName);
      setPrice(tour.price);
      setPriceDiscount(tour.priceDiscount);
      setDescription(tour.description);
      setDestination(tour.destination._id);
      setDestinationDetails(tour.destination);
      setBusiness(tour.business._id);
      setDetailedBusiness(tour.business);
      setServiceMobileNumber(tour.serviceMobileNumber);

      setTourName(tour.tourInfo.name);
      setDuration(tour.tourInfo.duration);
      setTravelDate(tour.tourInfo.travelDate);
      setMaxGroupSize(tour.tourInfo.maxGroupSize);
      setStartLocation(tour.tourInfo.startLocation);
      setLocations(tour.tourInfo.locations);
      setLeadGuideName(tour.tourInfo.leadGuideName);
      setGuideNames(tour.tourInfo.guideNames);
      setLeadGuideNid(tour.tourInfo.leadGuideNid);
      setLeadGuideContact(tour.tourInfo.leadGuideContact);
    } else {
      dispatch(getTourById(params.id));
    }
  }, [dispatch, isDetailsError, isDetailsSuccess, detailsErrorMessage, tour]);

  useEffect(() => {
    if (isUpdateError) {
      toast.error(updateErrorMessage, { position: "top-center" });
    } else if (isUpdateSuccess) {
      toast.success("Tour Updated Successfully", { position: "top-center" });
    }
  });

  useEffect(() => {
    if (isDestinationListError) {
      toast.error(destinationListErrorMessage, { position: "top-center" });
    } else if (!isDestinationListSuccess) {
      dispatch(getAllDestinations());
    }
  }, [
    dispatch,
    isDestinationListError,
    isDestinationListSuccess,
    destinationListErrorMessage,
  ]);

  useEffect(() => {
    if (isBusinessListError) {
      toast.error(businessListErrorMessage, { position: "top-center" });
    } else if (isBusinessListSuccess) {
      setOwnedBusiness(
        businesses.filter(
          (business) =>
            business.businessOwner._id === detailedBusiness.businessOwner._id
        )
      );
    } else {
      dispatch(getAllBusinesses());
    }
  }, [
    dispatch,
    isBusinessListError,
    isBusinessListSuccess,
    businessListErrorMessage,
    businesses,
    userInfo,
  ]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo.userType !== "businessowner") {
      navigate("/");
    }
  });

  useEffect(() => {
    return () => {
      dispatch(resetServiceDetails());
      dispatch(resetServiceUpdate());
      dispatch(resetDestinationList());
      dispatch(resetBusinessList());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isDeleteError) {
      toast.error(deleteErrorMessage, { position: "top-center" });
    } else if (isDeleteSuccess) {
      toast.success("Tour Deleted Successfully", { position: "top-center" });
      navigate("/serviceList");
    }
  });

  //To be Implemented
  const updateHandler = () => {};

  const deleteHandler = () => {
    dispatch(deleteService(params.id));
  };

  const uploadCoverImageFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `/api/upload${coverImg ? `/${coverImg.slice(8)}` : ""}`,
        formData,
        config
      );
      setCoverImg(data);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImageFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`/api/upload/`, formData, config);

      setImages([...images, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="pt-4">
      {isDetailsLoading ? (
        <Loader />
      ) : isDetailsError ? (
        <Message variant="danger">{detailsErrorMessage}</Message>
      ) : (
        <>
          <Row className="pb-5">
            <Card.Text as="h2" className="font-weight-bolder text-center">
              Tour Details
            </Card.Text>
          </Row>

          <Form>
            <Row>
              <Col xs={12} md={4} xl={3}>
                <Card className="mb-4">
                  <Card.Header>Cover Image</Card.Header>
                  <Card.Body className="text-center">
                    <Card.Img
                      cascade
                      className="img-fluid"
                      src={
                        coverImg !== "" ? coverImg : "/destinations/test.png"
                      }
                      style={{ height: "20vh", objectFit: "cover" }}
                    />
                    <Form.Group controlId="image 1">
                      <Form.Label>Upload New Image</Form.Label>
                      <Form.Control
                        required
                        className="mb-3"
                        type="file"
                        id="image-file"
                        label="Cover Image"
                        controlId="coverImg"
                        onChange={uploadCoverImageFileHandler}
                      ></Form.Control>
                    </Form.Group>
                  </Card.Body>
                </Card>
                <Card className="mb-4">
                  <Card.Header>Other Images</Card.Header>
                  <Card.Body className="text-center">
                    {images.length <= 0 ? (
                      <Card.Img
                        cascade
                        className="img-fluid"
                        src="/destinations/test.png"
                        style={{ height: "20vh", objectFit: "cover" }}
                      />
                    ) : (
                      <Carousel>
                        {images.map((image, index) => (
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={image}
                              alt={`Image-${index}`}
                              style={{ maxHeight: "20vh", objectFit: "cover" }}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    )}

                    <Form.Group controlId="image 1">
                      <Form.Label>Upload New Images</Form.Label>
                      <Form.Control
                        controlId="images"
                        className="mb-3"
                        type="file"
                        id="image-file"
                        label="Images"
                        onChange={uploadImageFileHandler}
                      ></Form.Control>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={8} xl={9}>
                <Card className="mb-4">
                  <Card.Header>Tour Details</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group
                          className="mb-3"
                          controlId="destinationName"
                        >
                          <Form.Label className="small mb-1">
                            Service Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      {/* Destination, Business */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Label className="small mb-1">
                          Select Destinaiton
                        </Form.Label>
                        <Form.Group className="mb-3" controlId="destination">
                          <Form.Control
                            required
                            className="form-select"
                            as="select"
                            type="select"
                            placeholder={
                              destination === ""
                                ? "Destination is Required"
                                : "Select Destination"
                            }
                            value={destination}
                            onChange={(e) => {
                              setDestination(e.target.value);
                            }}
                          >
                            <option selected value={destination}>
                              {destinationDetails === {}
                                ? "Select Destination"
                                : destinationDetails.name}
                            </option>
                            {destinations.map((destination) => (
                              <option
                                value={destination._id}
                                key={destination._id}
                              >
                                {destination.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>

                      <Col lg={6} md={6} sm={12}>
                        <Form.Label className="small mb-1">
                          Select Business
                        </Form.Label>
                        <Form.Group className="mb-3" controlId="business">
                          <Form.Control
                            required
                            className="form-select"
                            as="select"
                            type="select"
                            placeholder={
                              business === ""
                                ? "Business is Required"
                                : "Select Business"
                            }
                            value={business}
                            onChange={(e) => {
                              setBusiness(e.target.value);
                            }}
                          >
                            <option selected value={business}>
                              {detailedBusiness === {}
                                ? "detailedBusiness"
                                : detailedBusiness.businessName}
                            </option>
                            {ownedBusinesses.map((business) => (
                              <option value={business._id} key={business._id}>
                                {business.businessName}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      {/* Price, Price Discount */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Label className="small mb-1">
                          Price of service (BDT)
                        </Form.Label>
                        <Form.Group className="mb-3" controlId="price">
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              price <= 0
                                ? "Price is required and cannot be less than 0"
                                : "Enter Price of This Tour Package"
                            }
                            value={price <= 0 ? "" : price}
                            onChange={(e) => {
                              if (e.target.value < 0 || isNaN(e.target.value)) {
                                setPrice(0);
                              } else setPrice(e.target.value * 1);
                            }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Label className="small mb-1">
                          Discount Percentage
                        </Form.Label>
                        <Form.Group className="mb-3" controlId="price">
                          <Form.Control
                            type="text"
                            placeholder={
                              priceDiscount < 0
                                ? "Price discount needs to be between 1 and 100"
                                : "Enter Discount Percentage"
                            }
                            value={
                              priceDiscount <= 0 || priceDiscount > 100
                                ? ""
                                : priceDiscount
                            }
                            onChange={(e) => {
                              if (
                                e.target.value < 0 ||
                                e.target.value > 100 ||
                                isNaN(e.target.value)
                              ) {
                                setPriceDiscount(0);
                              } else setPriceDiscount(e.target.value * 1);
                            }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Label className="small mb-1">
                          Service Mobile Number
                        </Form.Label>
                        <Form.Group
                          className="mb-3"
                          controlId="serviceMobileNumber"
                        >
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              serviceMobileNumber === ""
                                ? "Mobile Number is Required"
                                : "Enter Mobile Number"
                            }
                            value={serviceMobileNumber}
                            onChange={(e) => {
                              setServiceMobileNumber(e.target.value);
                            }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className="font-weight-bolder text-muted mb-3">
                      Tour Details
                    </h5>

                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="tourName">
                          <Form.Label className="small mb-1">
                            Tour Name
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              tourName === ""
                                ? "Tour Package Name is Required"
                                : "Enter Name"
                            }
                            value={tourName}
                            onChange={(e) => setTourName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="duration">
                          <Form.Label className="small mb-1">
                            Tour Duration (min: 1)
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              duration <= 0
                                ? "Duration is Required"
                                : "Enter Duration"
                            }
                            value={duration <= 0 ? "" : duration}
                            onChange={(e) => {
                              if (e.target.value <= 0) {
                                setDuration(1);
                              } else {
                                setDuration(e.target.value * 1);
                              }
                            }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group controlId="travelDate">
                          <Form.Label className="small mb-1">
                            Travel Start Date
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              travelDate === null
                                ? "Travel Date is Required"
                                : "Enter Travel Date"
                            }
                            onChange={(e) =>
                              setTravelDate(new Date(e.target.value))
                            }
                            value={Moment(travelDate).format("YYYY-MM-DD")}
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="travelDate">
                          <Form.Control
                            required
                            type="date"
                            // placeholder={
                            //   travelDate === null
                            //     ? "Travel Date is Required"
                            //     : "Enter Travel Date"
                            // }
                            value={travelDate}
                            onChange={(e) =>
                              setTravelDate(new Date(e.target.value))
                            }
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="maxGroupSize">
                          <Form.Label className="small mb-1">
                            Maximum Group Size
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              maxGroupSize <= 0
                                ? "Maximum Group Size is Required(min: 1)"
                                : "Enter Maximum Group Size"
                            }
                            value={maxGroupSize <= 0 ? "" : maxGroupSize}
                            onChange={(e) => {
                              if (e.target.value <= 0) {
                                setMaxGroupSize(1);
                              } else {
                                setMaxGroupSize(e.target.value * 1);
                              }
                            }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="startLocation">
                          <Form.Label className="small mb-1">
                            Start Location
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              startLocation === ""
                                ? "Start Location is Required"
                                : "Enter Start Location"
                            }
                            value={startLocation}
                            onChange={(e) => setStartLocation(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="locations">
                          <Form.Label className="small mb-1">
                            Locations(Provide Location Names, Divided by Comma)
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              locations === []
                                ? "Locations is Required"
                                : "Enter Locations"
                            }
                            value={String(locations)}
                            onChange={(e) => {
                              setLocations(e.target.value.split(","));
                            }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="leadGuideName">
                          <Form.Label className="small mb-1">
                            Lead Guide Name
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              leadGuideName === ""
                                ? "Lead Guide Name is Required"
                                : "Enter Lead Guide Name"
                            }
                            value={leadGuideName}
                            onChange={(e) => setLeadGuideName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="guideNames">
                          <Form.Label className="small mb-1">
                            Guide Names(Provide Guide Names, Divided by Comma)
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              guideNames === []
                                ? "Guide Names is Required"
                                : "Enter Guide Names"
                            }
                            value={String(guideNames)}
                            onChange={(e) => {
                              setGuideNames(e.target.value.split(","));
                            }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="leadGuideNid">
                          <Form.Label className="small mb-1">
                            Lead Guide NID
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              leadGuideNid === ""
                                ? "Lead Guide NID is Required"
                                : "Enter Lead Guide NID"
                            }
                            value={leadGuideNid}
                            onChange={(e) => setLeadGuideNid(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className="mb-3"
                          controlId="leadGuideContact"
                        >
                          <Form.Label className="small mb-1">
                            Lead Guide Contact No
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              leadGuideContact === ""
                                ? "Lead Guide Contact No is Required"
                                : "Enter Lead Guide Contact No"
                            }
                            value={leadGuideContact}
                            onChange={(e) =>
                              setLeadGuideContact(e.target.value)
                            }
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group className="mb-3" controlId="description">
                          <Form.Label className="small mb-1">
                            Description
                          </Form.Label>
                          <Form.Control
                            required
                            as="textarea"
                            rows={3}
                            placeholder={
                              description === ""
                                ? "Description is Required"
                                : "Enter Description"
                            }
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Button
                          variant="outline-success"
                          size="md"
                          type="submit"
                          onClick={updateHandler}
                        >
                          Update Transportation Information
                        </Button>
                      </Col>
                      <Col
                        lg={6}
                        md={6}
                        sm={12}
                        className="d-flex justify-content-end"
                      >
                        <Button
                          variant="outline-danger"
                          onClick={deleteHandler}
                        >
                          Delete Service
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Container>
  );
};

export default TourDetailsBusiness;
