import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Carousel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import districts from "../staticData/districts";
import Message from "../components/Message";
import { toast } from "react-toastify";
import {
  createService,
  resetServiceCreate,
} from "../features/service/serviceSlice";
import {
  getAllDestinations,
  resetDestinationList,
} from "../features/destination/destinationSlice";
import {
  getAllBusinesses,
  resetBusinessList,
} from "../features/business/businessSlice";

const ServiceCreateScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    service,
    isCreateError: isServiceCreateError,
    isCreateSuccess: isServiceCreateSuccess,
    isCreateLoading: isServiceCreateLoading,
    createErrorMessage: serviceCreateErrorMessage,
  } = useSelector((state) => state.service);

  const {
    businesses,
    isListLoading: isBusinessListLoading,
    isListSuccess: isBusinessListSuccess,
    isListError: isBusinessListError,
    listErrorMessage: businessListErrorMessage,
  } = useSelector((state) => state.business);

  const {
    destinations,
    isListLoading: isDestinationListLoading,
    isListSuccess: isDestinationListSuccess,
    isListError: isDestinationListError,
    listErrorMessage: destinationListErrorMessage,
  } = useSelector((state) => state.destination);

  const [ownedBusinesses, setOwnedBusinesses] = useState([]);

  // For Base Service
  const [coverImg, setCoverImg] = useState("");
  const [images, setImages] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [price, setPrice] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [business, setBusiness] = useState("");
  const [serviceMobileNumber, setServiceMobileNumber] = useState("");

  // For Transport Services
  const [pickUpFrom, setPickUpFrom] = useState("");
  const [dropTo, setDropTo] = useState("");
  const [searchSelected, setSearchSelected] = useState(true);
  const [rentDuration, setRentDuration] = useState(10);
  const [carModel, setCarModel] = useState("");
  const [pickUpDate, setPickUpDate] = useState(null);
  const [dropOffDate, setDropOffDate] = useState(null);
  const [driverName, setDriverName] = useState("");
  const [driverContact, setDriverContact] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [carRegistration, setCarRegistration] = useState("");
  const [carType, setCarType] = useState("");

  // For Accomodation Services
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  const [ownerNid, setOwnerNid] = useState("");
  const [rooms, setRooms] = useState(0);
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [maxGuests, setMaxGuests] = useState(0);

  // For Tour Service
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
    if (isDestinationListError) {
      toast.error(destinationListErrorMessage, { position: "top-center" });
    } else if (!isDestinationListSuccess) {
      dispatch(getAllDestinations());
    }
  }, [
    isDestinationListError,
    destinationListErrorMessage,
    isDestinationListSuccess,
    dispatch,
  ]);

  useEffect(() => {
    if (isBusinessListError) {
      toast.error(businessListErrorMessage, { position: "top-center" });
    } else if (isBusinessListSuccess) {
      setOwnedBusinesses(
        businesses.filter(
          (business) => business.businessOwner._id === userInfo._id
        )
      );
    } else {
      dispatch(getAllBusinesses());
    }
  }, [
    isBusinessListError,
    businessListErrorMessage,
    isBusinessListSuccess,
    businesses,
    userInfo,
    dispatch,
  ]);

  useEffect(() => {
    if (isServiceCreateError) {
      toast.error(serviceCreateErrorMessage, { position: "top-center" });
    } else if (isServiceCreateSuccess) {
      toast.success("Service created successfully", { position: "top-center" });
      navigate(`/serviceList`);
    }
  }, [
    isServiceCreateError,
    serviceCreateErrorMessage,
    isServiceCreateSuccess,
    navigate,
  ]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo.userType !== "businessowner") {
      navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetServiceCreate());
      dispatch(resetDestinationList());
      dispatch(resetBusinessList());
    };
  }, [dispatch]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    if (serviceType === "transportation") {
      const serviceData = {
        coverImg,
        images,
        serviceName,
        serviceType,
        price,
        priceDiscount,
        serviceMobileNumber,
        description,
        destination,
        business,
        transportInfo: {
          pickUpFrom,
          dropTo,
          rentDuration,
          carModel,
          pickUpDate,
          dropOffDate,
          driverName,
          driverContact,
          driverLicense,
          carRegistration,
          carType,
        },
      };
      dispatch(createService(serviceData));
    } else if (serviceType === "accomodation") {
      const serviceData = {
        coverImg,
        images,
        serviceName,
        serviceType,
        price,
        priceDiscount,
        serviceMobileNumber,
        description,
        destination,
        business,
        accomodationInfo: {
          address: {
            house,
            street,
            area,
            city,
          },
          ownerName,
          ownerContact,
          ownerNid,
          rooms,
          checkinDate,
          checkoutDate,
          maxGuests,
        },
      };
      dispatch(createService(serviceData));
    } else if (serviceType === "tours") {
      const serviceData = {
        coverImg,
        images,
        serviceName,
        serviceType,
        price,
        priceDiscount,
        serviceMobileNumber,
        description,
        destination,
        business,
        tourInfo: {
          name: tourName,
          duration,
          travelDate,
          maxGroupSize,
          startLocation,
          locations,
          leadGuideName,
          guideNames,
          leadGuideNid,
          leadGuideContact,
        },
      };
      dispatch(createService(serviceData));
    } else {
      toast.error("Please select a service type", { position: "top-center" });
    }
  };

  return (
    <>
      {isServiceCreateLoading ? (
        <Loader />
      ) : (
        <Container className="pt-5">
          <Row className="pb-5">
            <Card.Text as="h2" className="font-weight-bolder text-center">
              Create Service
            </Card.Text>
          </Row>

          <Form onSubmit={submitHandler}>
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
                  <Card.Header>Service Information</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group
                          className="mb-3"
                          controlId="destinationName"
                        >
                          <Form.Label className="small mb-1">
                            Service Name
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              serviceName === ""
                                ? "Service Name is Required"
                                : "Enter Service Name"
                            }
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Label className="small mb-1">
                          Select Service Type
                        </Form.Label>
                        <Form.Group className="mb-3" controlId="searchDivision">
                          <Form.Control
                            required
                            className="form-select"
                            as="select"
                            type="select"
                            placeholder={
                              serviceType === ""
                                ? "Service Type is Required"
                                : "Select Service Type"
                            }
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                          >
                            <option disabled selected value="">
                              Select Service Type
                            </option>
                            <option value="transportation">
                              transportation
                            </option>
                            <option value="accomodation">accomodation</option>
                            <option value="tours">tours</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
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
                            <option disabled selected value="">
                              Select Destination
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
                            <option disabled selected value="">
                              Select Business
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
                                ? "Price is Required and cannot be less than 0"
                                : "Enter Price"
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
                          Discount percentage (If any)
                        </Form.Label>
                        <Form.Group className="mb-3" controlId="price">
                          <Form.Control
                            type="text"
                            placeholder={
                              priceDiscount < 0
                                ? "Price discount needs to be in between 1 to 100 percent"
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
                      <Col lg={6} md={6} sm={12}>
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
                    {serviceType !== "" && (
                      <>
                        {serviceType === "transportation" ? (
                          <Row>
                            <h5 className="font-weight-bolder text-muted mb-3">
                              Transportation Details
                            </h5>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="pickupFrom"
                              >
                                <Form.Label className="small mb-1">
                                  Pickup Location
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    pickUpFrom === ""
                                      ? "Pickup Location is Required"
                                      : "Select Pickup Location"
                                  }
                                  value={pickUpFrom}
                                  onChange={(e) => {
                                    setPickUpFrom(e.target.value);
                                    setSearchSelected(false);
                                  }}
                                ></Form.Control>
                              </Form.Group>

                              {pickUpFrom && !searchSelected && (
                                <ListGroup
                                  style={{
                                    position: "absolute",
                                    zIndex: "9999",
                                  }}
                                >
                                  {districts
                                    .filter((districtName) =>
                                      districtName
                                        .toLowerCase()
                                        .startsWith(pickUpFrom.toLowerCase())
                                    )
                                    .map((districtName, index) => (
                                      <ListGroup.Item
                                        key={index}
                                        onClick={(e) => {
                                          setPickUpFrom(e.target.innerText);
                                          setSearchSelected(true);
                                        }}
                                      >
                                        {districtName}
                                      </ListGroup.Item>
                                    ))}
                                </ListGroup>
                              )}
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group className="mb-3" controlId="dropTo">
                                <Form.Label className="small mb-1">
                                  DropOff Location
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    dropTo === ""
                                      ? "DropOff Location is Required"
                                      : "Select DropOff Location"
                                  }
                                  value={dropTo}
                                  onChange={(e) => {
                                    setDropTo(e.target.value);
                                    setSearchSelected(false);
                                  }}
                                ></Form.Control>
                              </Form.Group>

                              {dropTo && !searchSelected && (
                                <ListGroup
                                  style={{
                                    position: "absolute",
                                    zIndex: "9999",
                                  }}
                                >
                                  {districts
                                    .filter((districtName) =>
                                      districtName
                                        .toLowerCase()
                                        .startsWith(dropTo.toLowerCase())
                                    )
                                    .map((districtName, index) => (
                                      <ListGroup.Item
                                        key={index}
                                        onClick={(e) => {
                                          setDropTo(e.target.innerText);
                                          setSearchSelected(true);
                                        }}
                                      >
                                        {districtName}
                                      </ListGroup.Item>
                                    ))}
                                </ListGroup>
                              )}
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="rentDuration"
                              >
                                <Form.Label className="small mb-1">
                                  Max Rent Duration(optional)
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder={
                                    rentDuration <= 0
                                      ? "Rent Duration cannot be less than 1"
                                      : "Enter Rent Duration"
                                  }
                                  value={rentDuration <= 0 ? "" : rentDuration}
                                  onChange={(e) => {
                                    if (
                                      e.target.value < 0 ||
                                      isNaN(e.target.value)
                                    ) {
                                      setRentDuration(0);
                                    } else {
                                      setRentDuration(e.target.value * 1);
                                    }
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group className="mb-3" controlId="carModel">
                                <Form.Label className="small mb-1">
                                  Car Model
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    carModel === ""
                                      ? "Car Model is Required"
                                      : "Enter Car Model"
                                  }
                                  value={carModel}
                                  onChange={(e) => {
                                    setCarModel(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="pickUpDate"
                              >
                                <Form.Label className="small mb-1">
                                  PickUp Date
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="date"
                                  placeholder={
                                    pickUpDate === null
                                      ? "PickUp Date is Required"
                                      : "Select PickUp Date"
                                  }
                                  onChange={(e) => {
                                    setPickUpDate(new Date(e.target.value));
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="dropOffDate"
                              >
                                <Form.Label className="small mb-1">
                                  DropOff Date
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="date"
                                  placeholder={
                                    dropOffDate === null
                                      ? "DropOff Date is Required"
                                      : "Select DropOff Date"
                                  }
                                  onChange={(e) => {
                                    setDropOffDate(new Date(e.target.value));
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="driverName"
                              >
                                <Form.Label className="small mb-1">
                                  Driver Name
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    driverName === ""
                                      ? "Driver Name is Required"
                                      : "Enter Driver Name"
                                  }
                                  value={driverName}
                                  onChange={(e) => {
                                    setDriverName(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="driverContact"
                              >
                                <Form.Label className="small mb-1">
                                  Driver Contact
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    driverContact === ""
                                      ? "Driver Contact is Required"
                                      : "Enter Driver Contact"
                                  }
                                  value={driverContact}
                                  onChange={(e) => {
                                    setDriverContact(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="driverLicense"
                              >
                                <Form.Label className="small mb-1">
                                  Driver License
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    driverLicense === ""
                                      ? "Driver License is Required"
                                      : "Enter Driver License"
                                  }
                                  value={driverLicense}
                                  onChange={(e) => {
                                    setDriverLicense(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="carRegistration"
                              >
                                <Form.Label className="small mb-1">
                                  Car registration number
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    carRegistration === ""
                                      ? "Car Registration Number is Required"
                                      : "Enter Car Registration Number"
                                  }
                                  value={carRegistration}
                                  onChange={(e) => {
                                    setCarRegistration(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group className="mb-3" controlId="carType">
                                <Form.Label className="small mb-1">
                                  Car Type
                                </Form.Label>
                                <Form.Control
                                  required
                                  className="form-select"
                                  as="select"
                                  type="select"
                                  placeholder={
                                    carType === ""
                                      ? "Car Type is Required"
                                      : "Select Car Type"
                                  }
                                  value={carType}
                                  onChange={(e) => {
                                    setCarType(e.target.value);
                                  }}
                                >
                                  <option disabled selected value="">
                                    Select Car Type
                                  </option>
                                  <option value="4 seater">4 Seater</option>
                                  <option value="6 seater">6 Seater</option>
                                  <option value="8 seater">8 Seater</option>
                                </Form.Control>
                              </Form.Group>
                            </Col>
                          </Row>
                        ) : serviceType === "accomodation" ? (
                          <Row>
                            <h5 className="font-weight-bolder text-muted mb-3">
                              Accomodation Details
                            </h5>
                            <h6 className="font-weight-bolder text-muted mb-3">
                              Address
                            </h6>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group className="mb-3" controlId="house">
                                <Form.Label className="small mb-1">
                                  House No/Name
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    house === ""
                                      ? "House is Required"
                                      : "Enter House"
                                  }
                                  value={house}
                                  onChange={(e) => {
                                    setHouse(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group className="mb-3" controlId="street">
                                <Form.Label className="small mb-1">
                                  Street No/Name
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    street === ""
                                      ? "Street is Required"
                                      : "Enter Street"
                                  }
                                  value={street}
                                  onChange={(e) => {
                                    setStreet(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group className="mb-3" controlId="area">
                                <Form.Label className="small mb-1">
                                  Area Name
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    area === ""
                                      ? "Area is Required"
                                      : "Enter Area"
                                  }
                                  value={area}
                                  onChange={(e) => {
                                    setArea(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group className="mb-3" controlId="city">
                                <Form.Label className="small mb-1">
                                  City
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    city === ""
                                      ? "City is Required"
                                      : "Enter City"
                                  }
                                  value={city}
                                  onChange={(e) => {
                                    setCity(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <h6 className="font-weight-bolder text-muted mb-3">
                              Other Information
                            </h6>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="ownerName"
                              >
                                <Form.Label className="small mb-1">
                                  Owner Name
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    ownerName === ""
                                      ? "Owner Name is Required"
                                      : "Enter Owner Name"
                                  }
                                  value={ownerName}
                                  onChange={(e) => {
                                    setOwnerName(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="ownerContact"
                              >
                                <Form.Label className="small mb-1">
                                  Owner Contact Number
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    ownerContact === ""
                                      ? "Owner Contact is Required"
                                      : "Enter Owner Contact"
                                  }
                                  value={ownerContact}
                                  onChange={(e) => {
                                    setOwnerContact(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group className="mb-3" controlId="ownerNid">
                                <Form.Label className="small mb-1">
                                  Owner NID Number
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    ownerNid === ""
                                      ? "Owner NID is Required"
                                      : "Enter Owner NID"
                                  }
                                  value={ownerNid}
                                  onChange={(e) => {
                                    setOwnerNid(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group className="mb-3" controlId="rooms">
                                <Form.Label className="small mb-1">
                                  Number of rooms
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    rooms <= 0
                                      ? "Number of rooms is Required(min: 1, max: 10)"
                                      : "Enter Number of rooms"
                                  }
                                  value={rooms <= 0 || rooms > 10 ? "" : rooms}
                                  onChange={(e) => {
                                    setRooms(e.target.value * 1);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="checkinDate"
                              >
                                <Form.Label className="small mb-1">
                                  Checkin Date
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="date"
                                  placeholder={
                                    checkinDate === ""
                                      ? "Checkin Date is Required"
                                      : "Enter Checkin Date"
                                  }
                                  onChange={(e) => {
                                    setCheckinDate(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="checkoutDate"
                              >
                                <Form.Label className="small mb-1">
                                  Checkout Date
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="date"
                                  placeholder={
                                    checkoutDate === ""
                                      ? "Checkout Date is Required"
                                      : "Enter Checkout Date"
                                  }
                                  onChange={(e) => {
                                    setCheckoutDate(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="maxGuests"
                              >
                                <Form.Label className="small mb-1">
                                  Maximum Guests
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={
                                    maxGuests <= 0
                                      ? "Maximum Guests is Required(min: 1)"
                                      : "Enter Maximum Guests"
                                  }
                                  value={maxGuests <= 0 ? "" : maxGuests}
                                  onChange={(e) => {
                                    if (e.target.value <= 0) {
                                      setMaxGuests(1);
                                    } else {
                                      setMaxGuests(e.target.value * 1);
                                    }
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                          </Row>
                        ) : (
                          <Row>
                            <h5 className="font-weight-bolder text-muted mb-3">
                              Tour Details
                            </h5>
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
                                      ? "Name is Required"
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
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="travelDate"
                              >
                                <Form.Label className="small mb-1">
                                  Travel start Date
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="date"
                                  placeholder={
                                    travelDate === null
                                      ? "Travel Date is Required"
                                      : "Enter Travel Date"
                                  }
                                  onChange={(e) =>
                                    setTravelDate(new Date(e.target.value))
                                  }
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="maxGroupSize"
                              >
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
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="startLocation"
                              >
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
                                  onChange={(e) =>
                                    setStartLocation(e.target.value)
                                  }
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="locations"
                              >
                                <Form.Label className="small mb-1">
                                  Locations(Provide Location Names, Divided by
                                  Comma)
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
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="leadGuideName"
                              >
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
                                  onChange={(e) =>
                                    setLeadGuideName(e.target.value)
                                  }
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="guideNames"
                              >
                                <Form.Label className="small mb-1">
                                  Guide Names(Write Guide Names seperated by
                                  comma)
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
                            <Col lg={6} md={6} sm={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="leadGuideNid"
                              >
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
                                  onChange={(e) =>
                                    setLeadGuideNid(e.target.value)
                                  }
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
                        )}
                      </>
                    )}
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
                    <Row className="py-4">
                      <Button variant="outline-dark" size="md" type="submit">
                        <b>Create Service</b>
                      </Button>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </>
  );
};

export default ServiceCreateScreen;
