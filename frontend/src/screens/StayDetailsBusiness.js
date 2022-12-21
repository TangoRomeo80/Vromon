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
  getAccomodationById,
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
import Loader from "../components/Loader";
import Message from "../components/Message";

const StayDetailsBusiness = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    accomodation,
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
  const [serviceType, setServiceType] = useState("");
  const [price, setPrice] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationDetails, setDestinationDetails] = useState({});
  const [business, setBusiness] = useState("");
  const [detailedBusiness, setDetailedBusiness] = useState({});
  const [ownedBusinesses, setOwnedBusiness] = useState([]);
  const [serviceMobileNumber, setServiceMobileNumber] = useState("");

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

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: "top-center" });
    } else if (isDetailsSuccess) {
      setCoverImg(accomodation.coverImg);
      setImages(accomodation.images);
      setServiceName(accomodation.serviceName);
      setServiceType(accomodation.serviceType);
      setPrice(accomodation.price);
      setPriceDiscount(accomodation.priceDiscount);
      setDescription(accomodation.description);
      setDestination(accomodation.destination._id);
      setDestinationDetails(accomodation.destination);
      setBusiness(accomodation.business._id);
      setDetailedBusiness(accomodation.business);
      setServiceMobileNumber(accomodation.serviceMobileNumber);

      setHouse(accomodation.accomodationInfo.address.house);
      setStreet(accomodation.accomodationInfo.address.street);
      setArea(accomodation.accomodationInfo.address.area);
      setCity(accomodation.accomodationInfo.address.city);
      setOwnerName(accomodation.accomodationInfo.ownerName);
      setOwnerContact(accomodation.accomodationInfo.ownerContact);
      setOwnerNid(accomodation.accomodationInfo.ownerNid);
      setRooms(accomodation.accomodationInfo.rooms);
      setCheckinDate(accomodation.accomodationInfo.checkinDate);
      setCheckoutDate(accomodation.accomodationInfo.checkoutDate);
      setMaxGuests(accomodation.accomodationInfo.maxGuests);
    } else {
      dispatch(getAccomodationById(params.id));
    }
  }, [
    dispatch,
    isDetailsSuccess,
    isDetailsError,
    detailsErrorMessage,
    accomodation,
  ]);

  useEffect(() => {
    if (isUpdateError) {
      toast.error(updateErrorMessage, { position: "top-center" });
    } else if (isUpdateSuccess) {
      toast.success("Accomodation Information Updated successfully", {
        position: "top-center",
      });
      navigate("/serviceList");
    }
  });

  useEffect(() => {
    if (isDeleteError) {
      toast.error(deleteErrorMessage, { position: "top-center" });
    } else if (isDeleteSuccess) {
      toast.success("Accomodation Information Deleted successfully", {
        position: "top-center",
      });
      navigate("/serviceList");
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
    } else if (isBusinessListSuccess && isDetailsSuccess) {
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
    return () => {
      dispatch(resetServiceDetails());
      dispatch(resetServiceUpdate());
      dispatch(resetDestinationList());
      dispatch(resetBusinessList());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo.userType !== "businessowner") {
      navigate("/");
    }
  });

  // To be Implemented
  const updateHandler = () => {
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
    dispatch(updateService({ id: params.id, serviceData }));
  };

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
    <Container className="pt-5">
      {isDetailsLoading ? (
        <Loader />
      ) : isDetailsError ? (
        <Message variant="danger">{detailsErrorMessage}</Message>
      ) : (
        <>
          <Row className="pb-5">
            <Card.Text as="h2" className="font-weight-bolder text-center">
              Accomodation Details
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
                  <Card.Header>Accomodation Information</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group className="mb-3" controlId="serviceName">
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
                      Accomodation Details
                    </h5>
                    <h6 className="font-weight-bolder text-muted mb-3">
                      Address
                    </h6>

                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="house">
                          <Form.Label className="small mb-1">
                            House No/Name
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              house === "" ? "House is Required" : "Enter House"
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
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="area">
                          <Form.Label className="small mb-1">
                            Area Name
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              area === "" ? "Area is Required" : "Enter Area"
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
                          <Form.Label className="small mb-1">City</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              city === "" ? "City is Required" : "Enter City"
                            }
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <h6 className="font-weight-bolder text-muted mb-3">
                      Other Information
                    </h6>

                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="ownerName">
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
                        <Form.Group className="mb-3" controlId="ownerContact">
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
                    </Row>
                    <Row>
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
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group controlId="checkinDate">
                          <Form.Label className="small mb-1">
                            Checkin Date
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              checkinDate === ""
                                ? "Checkin Date is Required"
                                : "Enter Checkin Date"
                            }
                            onChange={(e) => {
                              setCheckinDate(e.target.value);
                            }}
                            value={Moment(checkinDate).format("DD-MM-YYYY")}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="checkinDate">
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
                            value={Moment(checkinDate).format("YYYY-MM-DD")}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group controlId="checkoutDate">
                          <Form.Label className="small mb-1">
                            Checkout Date
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={
                              checkoutDate === ""
                                ? "Checkout Date is Required"
                                : "Enter Checkout Date"
                            }
                            onChange={(e) => {
                              setCheckoutDate(e.target.value);
                            }}
                            value={Moment(checkoutDate).format("DD-MM-YYYY")}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="checkoutDate">
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
                            value={Moment(checkoutDate).format("YYYY-MM-DD")}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group className="mb-3" controlId="maxGuests">
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
                          Update Accomodation Information
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

export default StayDetailsBusiness;
