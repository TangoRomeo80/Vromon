import React, { useState, useEffect } from "react";
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
import { LinkContainer } from "react-router-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import districts from "../staticData/districts";
import {
  getTransportById,
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

const TransportDetailBusiness = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    transport,
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

  const [carType, setCarType] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carRegistration, setCarRegistration] = useState("");
  const [pickUpFrom, setPickUpFrom] = useState("");
  const [pickUpDate, setPickUpDate] = useState(null);
  const [dropTo, setDropTo] = useState("");
  const [dropOffDate, setDropOffDate] = useState(null);
  const [pickUpFromSelected, setPickUpFromSelected] = useState(true);
  const [dropToSelected, setDropToSelected] = useState(true);
  const [rentDuration, setRentDuration] = useState(10);

  const [driverName, setDriverName] = useState("");
  const [driverContact, setDriverContact] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: "top-center" });
    } else if (isDetailsSuccess) {
      setCoverImg(transport.coverImg);
      setServiceName(transport.serviceName);
      setPrice(transport.price);
      setPriceDiscount(transport.priceDiscount);
      setDescription(transport.description);
      setDestination(transport.destination._id);
      setDestinationDetails(transport.destination);
      setBusiness(transport.business._id);
      setDetailedBusiness(transport.business);
      setServiceMobileNumber(transport.serviceMobileNumber);

      setPickUpFrom(transport.transportInfo.pickUpFrom);
      setDropTo(transport.transportInfo.dropTo);
      setRentDuration(transport.transportInfo.rentDuration);
      setCarModel(transport.transportInfo.carModel);
      setPickUpDate(transport.transportInfo.pickUpDate);
      setDropOffDate(transport.transportInfo.dropOffDate);
      setDriverName(transport.transportInfo.driverName);
      setDriverContact(transport.transportInfo.driverContact);
      setDriverLicense(transport.transportInfo.driverLicense);
      setCarRegistration(transport.transportInfo.carRegistration);
      setCarType(transport.transportInfo.carType);
      setPickUpFromSelected(true);
      setDropToSelected(true);
    } else {
      dispatch(getTransportById(params.id));
    }
  }, [
    dispatch,
    transport,
    isDetailsSuccess,
    isDetailsError,
    detailsErrorMessage,
  ]);

  useEffect(() => {
    if (isUpdateError) {
      toast.error(updateErrorMessage, { position: "top-center" });
    } else if (isUpdateSuccess) {
      toast.success("Transport Details Updated Successfully", {
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
      dispatch(resetServiceDelete());
      dispatch(resetDestinationList());
      dispatch(resetBusinessList());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isDeleteError) {
      toast.error(deleteErrorMessage, { position: "top-center" });
    } else if (isDeleteSuccess) {
      toast.error("Transport Deleted Successfully", { position: "top-center" });
      navigate("/serviceList");
    }
  });

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo.userType !== "businessowner") {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const updateHandler = () => {
    const serviceData = {
      coverImg,
      images,
      serviceName,
      price,
      priceDiscount,
      description,
      destination,
      business,
      serviceMobileNumber,
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
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(`/api/upload/`, formData, config)

      setImages([...images, data])
    } catch (error) {
      console.error(error)
    }
  }

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
              Transport Details
            </Card.Text>
          </Row>

          <Form>
            <Row>
              <Col xs={12} md={4} xl={3}>
                <Card className="mb-4">
                  <Card.Header>Cover Image</Card.Header>
                  <Card.Body className="text-center">
                    <Card.Img
                      src={
                        coverImg !== "" ? coverImg : "/destinations/test.png"
                      }
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
                  <Card.Header>Transport Details</Card.Header>
                  <Card.Body>
                    <h5 className="font-weight-bolder text-muted mb-3">
                      Service Details
                    </h5>
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
                      {/* Price, Discount */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Label className="small mb-1">
                          Service Cost (BDT)
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
                      Transport Information
                    </h5>
                    <h6 className="font-weight-bolder text-muted mb-3">
                      Car Information
                    </h6>

                    <Row>
                      {/* Car Type */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="carType">
                          <Form.Label className="small mb-1">
                            Car Type
                          </Form.Label>
                          <Form.Control
                            as="select"
                            type="select"
                            value={carType}
                            onChange={(e) => setCarType(e.target.value)}
                          >
                            <option selected value={carType}>
                              {carType === "" ? "Select Car Type" : carType}
                            </option>
                            <option value="4 seater">4 Seater</option>
                            <option value="6 seater">6 Seater</option>
                            <option value="8 seater">8 Seater</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>

                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="carModel">
                          <Form.Label className="small mb-1">
                            Car Model
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={carModel}
                            onChange={(e) => setCarModel(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group
                          className="mb-3"
                          controlId="carRegistration"
                        >
                          <Form.Label className="small mb-1">
                            Car Registration Number
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={carRegistration}
                            onChange={(e) => setCarRegistration(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className="font-weight-bolder text-muted mb-3">
                      Pick & Drop Information
                    </h5>
                    <Row>
                      {/* pickupFrom, pickUpDate, dropTo, dropOffDate */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="pickupFrom">
                          <Form.Label className="small mb-1">
                            Pick-Up From
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={pickUpFrom}
                            onChange={(e) => {
                              setPickUpFrom(e.target.value);
                              setPickUpFromSelected(false);
                            }}
                          ></Form.Control>
                        </Form.Group>
                        {pickUpFrom && !pickUpFromSelected && (
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
                                    setPickUpFromSelected(true);
                                  }}
                                >
                                  {districtName}
                                </ListGroup.Item>
                              ))}
                          </ListGroup>
                        )}
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group controlId="pickUpDate">
                          <Form.Label className="small mb-1">
                            Pick-Up Date
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={Moment(pickUpDate).format("DD-MM-YYYY")}
                            onChange={(e) => setPickUpDate(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="pickUpDate">
                          <Form.Control
                            type="date"
                            value={pickUpDate}
                            onChange={(e) => setPickUpDate(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="dropTo">
                          <Form.Label className="small mb-1">
                            Drop To
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={dropTo}
                            onChange={(e) => {
                              setDropTo(e.target.value);
                              setDropToSelected(false);
                            }}
                          ></Form.Control>
                        </Form.Group>
                        {dropTo && !dropToSelected && (
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
                                    setDropToSelected(true);
                                  }}
                                >
                                  {districtName}
                                </ListGroup.Item>
                              ))}
                          </ListGroup>
                        )}
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group controlId="dropOffDate">
                          <Form.Label className="small mb-1">
                            Drop-Off Date
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={Moment(dropOffDate).format("DD-MM-YYYY")}
                            onChange={(e) => setDropOffDate(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dropOffDate">
                          <Form.Control
                            type="date"
                            value={dropOffDate}
                            onChange={(e) => setDropOffDate(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="rentDuration">
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
                              if (e.target.value < 0 || isNaN(e.target.value)) {
                                setRentDuration(0);
                              } else {
                                setRentDuration(e.target.value * 1);
                              }
                            }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className="font-weight-bolder text-muted mb-3">
                      Driver Information
                    </h5>
                    <Row>
                      {/* driverName, driverContact, driverLicense */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="driverName">
                          <Form.Label className="small mb-1">
                            Driver Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={driverName}
                            onChange={(e) => setDriverName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="driverContact">
                          <Form.Label className="small mb-1">
                            Driver Contact
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={driverContact}
                            onChange={(e) => setDriverContact(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group className="mb-3" controlId="driverLicense">
                          <Form.Label className="small mb-1">
                            Driver License
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={driverLicense}
                            onChange={(e) => setDriverLicense(e.target.value)}
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

                    <Row className="py-4">
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

export default TransportDetailBusiness;
