import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getTransportById,
  updateService,
  deleteService,
  resetServiceDetails,
  resetServiceUpdate,
  resetServiceDelete,
} from "../features/service/serviceSlice";
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

  const [transportType, setTransportType] = useState("");
  const [serviceName, setServiceName] = useState("");

  const [departFrom, setDepartFrom] = useState("");
  const [departTo, setDepartTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [departTime, setDepartTime] = useState("");

  const [arrivalTime, setArrivalTime] = useState("");

  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const [pickupFrom, setPickupFrom] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropTo, setDropTo] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");

  const [rentDuration, setRentDuration] = useState("");

  const [driverName, setDriverName] = useState("");
  const [driverContact, setDriverContact] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  const [carRegistration, setCarRegistration] = useState("");
  const [carImage, setCarImage] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carType, setCarType] = useState("");

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: "top-center" });
    } else if (isDetailsSuccess) {
      setTransportType(transport.transportInfo.transportType);
      setServiceName(transport.serviceName);
      setDepartFrom(transport.transportInfo.departFrom);
      setDepartTo(transport.transportInfo.departTo);
      setDepartDate(transport.transportInfo.departDate);
      setDepartTime(transport.transportInfo.departTime);
      setArrivalTime(transport.transportInfo.arrivalTime);
      setReturnDate(transport.transportInfo.returnDate);
      setReturnTime(transport.transportInfo.returnTime);
      setPickupFrom(transport.transportInfo.pickupFrom);
      setDropTo(transport.transportInfo.dropTo);
      setRentDuration(transport.transportInfo.rentDuration);
      setPickUpDate(transport.transportInfo.pickUpDate);
      setDropOffDate(transport.transportInfo.dropOffDate);
      setPickUpTime(transport.transportInfo.pickUpTime);
      setDropOffTime(transport.transportInfo.dropOffTime);
      setDriverName(transport.transportInfo.driverName);
      setDriverContact(transport.transportInfo.driverContact);
      setDriverLicense(transport.transportInfo.driverLicense);
      setCarRegistration(transport.transportInfo.carRegistration);
      setCarImage(transport.coverImg);
      setCarModel(transport.transportInfo.carModel);
      setCarType(transport.transportInfo.carType);
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
    }
  });

  useEffect(() => {
    return () => {
      dispatch(resetServiceDetails());
      dispatch(resetServiceUpdate());
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

  //To be implemented
  const updateHandler = () => {};
  
  const deleteHandler = () => {
    dispatch(deleteService(params.id));
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
              Transport Details
            </Card.Text>
          </Row>

          <Form>
            <Row>
              <Col xs={12} md={4} xl={3}>
                <Card className="mb-4">
                  <Card.Header>Transport Image</Card.Header>
                  <Card.Body className="text-center">
                    <Card.Img src={carImage} />
                    <Form.Group controlId="carImage">
                      <Form.Label>Upload New Image</Form.Label>
                      <Form.Control
                        className="mb-3"
                        type="file"
                        id="image-file"
                        label="Cover Image"
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
                      Transport Information
                    </h5>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group className="mb-3" controlId="serviceName">
                          <Form.Label className="small mb-1">
                            Transport Service Name
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
                              {carType === '' ? 'Select Car Type' : carType}
                            </option>
                            <option value="4 Seater">4 Seater</option>
                            <option value="6 Seater">6 Seater</option>
                            <option value="8 Seater">8 Seater</option>
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
                      Departure Information
                    </h5>
                    <Row>
                      {/* departFrom, departTo, departDate, departTime */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="departFrom">
                          <Form.Label className="small mb-1">
                            Depart From
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={departFrom}
                            onChange={(e) => setDepartFrom(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="departTo">
                          <Form.Label className="small mb-1">
                            Depart To
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={departTo}
                            onChange={(e) => setDepartTo(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group controlId="departDate">
                          <Form.Label className="small mb-1">
                            Depart Date
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={Moment(departDate).format("DD-MM-YYYY")}
                            onChange={(e) => setDepartDate(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="departDate">
                          <Form.Control
                            type="date"
                            value={departDate}
                            onChange={(e) => setDepartDate(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      {/* <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="departTime">
                          <Form.Label className="small mb-1">
                            Depart Time
                          </Form.Label>
                          <Form.Control
                            type="time"
                            value={departTime}
                            onChange={(e) => setDepartTime(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col> */}
                    </Row>

                    <h5 className="font-weight-bolder text-muted mb-3">
                      Return Information
                    </h5>
                    <Row>
                      {/* returnDate, returnTime */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group controlId="returnDate">
                          <Form.Label className="small mb-1">
                            Return Date
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={Moment(returnDate).format("DD-MM-YYYY")}
                            onChange={(e) => setReturnDate(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="returnDate">
                          <Form.Control
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      {/* <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="returnTime">
                          <Form.Label className="small mb-1">
                            Return Time
                          </Form.Label>
                          <Form.Control
                            type="time"
                            value={returnTime}
                            onChange={(e) => setReturnTime(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col> */}
                    </Row>

                    <h5 className="font-weight-bolder text-muted mb-3">
                      Pick & Drop Information
                    </h5>
                    <Row>
                      {/* pickupFrom, pickUpDate, pickUpTime, dropTo, dropOffDate, dropOffTime */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="pickupFrom">
                          <Form.Label className="small mb-1">
                            Pick-Up From
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={pickupFrom}
                            onChange={(e) => setPickupFrom(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
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
                      {/* <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="pickUpTime">
                          <Form.Label className="small mb-1">
                            Pick-Up Time
                          </Form.Label>
                          <Form.Control
                            type="time"
                            value={pickUpTime}
                            onChange={(e) => setPickUpTime(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col> */}
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="dropTo">
                          <Form.Label className="small mb-1">
                            Drop To
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={dropTo}
                            onChange={(e) => setDropTo(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
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
                      {/* <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="dropOffTime">
                          <Form.Label className="small mb-1">
                            Drop-Off Time
                          </Form.Label>
                          <Form.Control
                            type="time"
                            value={dropOffTime}
                            onChange={(e) => setDropOffTime(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col> */}
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
