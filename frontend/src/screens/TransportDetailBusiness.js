import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useParams } from "react-router-dom";
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

import Loader from "../components/Loader";
import Message from "../components/Message";

const TransportDetailBusiness = () => {
  const dispatch = useDispatch();
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
  const [departFrom, setDepartFrom] = useState("");
  const [departTo, setDepartTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [departTime, setDepartTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [busType, setBusType] = useState("");
  const [pickupFrom, setPickupFrom] = useState("");
  const [dropTo, setDropTo] = useState("");
  const [rentDuration, setRentDuration] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverContact, setDriverContact] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [carRegistration, setCarRegistration] = useState("");
  const [carRegistrationImage, setCarRegistrationImage] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carType, setCarType] = useState("");

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: "top-center" });
    } else if (isDetailsSuccess) {
      setTransportType(transport.transportInfo.transportType);
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
      setCarRegistrationImage(transport.transportInfo.carRegistrationImage);
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

  //To be imaplemented
  const updateHandler = () => {};
  const deleteHandler = () => {};

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
                    <Form.Group controlId="image 1">
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
                <Card className="mb-4">
                  <Card.Header>NID Scan Copy</Card.Header>
                  <Card.Body className="text-center">
                    <Form.Group controlId="image 2">
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
                <Card className="mb-4">
                  <Card.Header>Transportation Documents</Card.Header>
                  <Card.Body className="text-center">
                    <Form.Group controlId="image 3">
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
                  <Card.Header>Transport Information</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="transportName">
                          <Form.Label className="small mb-1">
                            Transport Name
                          </Form.Label>
                          <Form.Control required type="text"></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="transportName">
                          <Form.Label className="small mb-1">
                            Car Type
                          </Form.Label>
                          <Form.Control required type="text"></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group className="mb-3" controlId="transportName">
                          <Form.Label className="small mb-1">
                            Car Model
                          </Form.Label>
                          <Form.Control required type="text"></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="transportName">
                          <Form.Label className="small mb-1">
                            Pick From
                          </Form.Label>
                          <Form.Control required type="text"></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="transportName">
                          <Form.Label className="small mb-1">
                            Drop To
                          </Form.Label>
                          <Form.Control required type="text"></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="transportName">
                          <Form.Label className="small mb-1">
                            Pick Time
                          </Form.Label>
                          <Form.Control required type="text"></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="transportName">
                          <Form.Label className="small mb-1">
                            Drop Ttime
                          </Form.Label>
                          <Form.Control required type="text"></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="py-4">
                      <Col lg={6} md={6} sm={12}>
                        <Button
                          variant="outline-success"
                          size="md"
                          type="submit"
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
                        <Button variant="outline-danger">Delete Service</Button>
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
